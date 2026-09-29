import { Injectable, computed, signal } from '@angular/core';
import { HubNotification, SEVERITY_RANK, buildSeedNotifications } from './notifications.data';

export interface DateGroup {
  key: string;
  label: string;
  items: HubNotification[];
}

const HOME_WINDOW_DAYS = 30;

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly _all = signal<HubNotification[]>(buildSeedNotifications());
  private nextId = 1;

  readonly all = this._all.asReadonly();

  readonly homeItems = computed(() => {
    const now = Date.now();
    const cutoff = now - HOME_WINDOW_DAYS * 864e5;
    return this._all().filter((n) => {
      const t = n.createdAt.getTime();
      return !n.dismissed && t <= now && t >= cutoff;
    });
  });

  dismiss(id: string): void {
    this.update(id, { dismissed: true });
  }

  restore(id: string): void {
    this.update(id, { dismissed: false });
  }

  dismissMany(ids: string[]): void {
    const set = new Set(ids);
    this._all.update((list) => list.map((n) => (set.has(n.id) ? { ...n, dismissed: true } : n)));
  }

  add(n: Omit<HubNotification, 'id' | 'dismissed' | 'createdByUser'>): void {
    const created: HubNotification = { ...n, id: `user-${this.nextId++}`, dismissed: false, createdByUser: true };
    this._all.update((list) => [created, ...list].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  }

  private update(id: string, patch: Partial<HubNotification>): void {
    this._all.update((list) => list.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  }
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

const fullDate = (d: Date) => d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
const time = (d: Date) =>
  d.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' }).replace('a.m.', 'am').replace('p.m.', 'pm');

// Timeframe labels per the Figma annotation: "Today" with date, "Yesterday", then the date.
export function groupLabel(d: Date, now = new Date()): string {
  const diffDays = Math.round((startOfDay(now) - startOfDay(d)) / 864e5);
  if (diffDays === 0) return `Today, ${fullDate(d)}`;
  if (diffDays === 1) return 'Yesterday';
  return fullDate(d);
}

export function relativeTime(d: Date, now = new Date()): string {
  const mins = Math.round((now.getTime() - d.getTime()) / 60_000);
  const diffDays = Math.round((startOfDay(now) - startOfDay(d)) / 864e5);
  // `now` comes from a clock that ticks once a minute, so an item created since
  // the last tick is slightly "in the future" — still just now.
  if (mins > -2 && mins < 60) return mins <= 1 ? 'Just now' : `${mins} minutes ago`;
  if (diffDays === 0) return `Today at ${time(d)}`;
  if (diffDays === 1) return `Yesterday at ${time(d)}`;
  return `${d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} at ${time(d)}`;
}

const rank = (n: HubNotification) => (n.severity ? SEVERITY_RANK[n.severity] : Object.keys(SEVERITY_RANK).length);

// Within a day, severity leads (urgent first) and recency breaks ties — matches the Figma ordering.
// User-created notifications have no severity, so they follow the system ones.
export function groupByDay(items: HubNotification[]): DateGroup[] {
  const groups = new Map<string, DateGroup>();
  for (const n of items) {
    const key = dayKey(n.createdAt);
    let g = groups.get(key);
    if (!g) {
      g = { key, label: groupLabel(n.createdAt), items: [] };
      groups.set(key, g);
    }
    g.items.push(n);
  }
  for (const g of groups.values()) {
    g.items.sort(
      (a, b) => rank(a) - rank(b) || b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
  return [...groups.values()];
}
