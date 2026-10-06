import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  GoabBadge,
  GoabButton,
  GoabContainer,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFilterChip,
  GoabFormItem,
  GoabPagination,
} from '@abgov/angular-components';
import {
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabPaginationOnChangeDetail,
} from '@abgov/ui-components-common';
import { CompactDatePickerDirective } from '../compact-date-picker.directive';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { AddNotificationDrawerComponent } from '../add-notification-drawer/add-notification-drawer.component';
import { NotificationsService } from '../notifications.service';
import { PROGRAMS, PROGRAM_BY_ID, SEVERITIES } from '../notifications.data';

const PAGE_SIZE = 20;

type Status = '' | 'active' | 'dismissed';

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'dismissed', label: 'Dismissed' },
];

function parseIsoDate(s: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.slice(0, 10).split('-').map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
}

@Component({
  selector: 'hub-notifications-page',
  standalone: true,
  imports: [
    GoabBadge,
    GoabButton,
    GoabContainer,
    GoabDatePicker,
    GoabDropdown,
    GoabDropdownItem,
    GoabFilterChip,
    GoabFormItem,
    GoabPagination,
    CompactDatePickerDirective,
    NotificationListComponent,
    AddNotificationDrawerComponent,
  ],
  templateUrl: './hub-notifications-page.component.html',
  styleUrl: './hub-notifications-page.component.scss',
})
export class HubNotificationsPageComponent {
  readonly service = inject(NotificationsService);

  readonly programs = PROGRAMS;
  readonly severities = SEVERITIES;
  readonly statusOptions = STATUS_OPTIONS;
  readonly pageSize = PAGE_SIZE;

  readonly program = signal('');
  readonly severity = signal('');
  readonly status = signal<Status>('');
  readonly from = signal('');
  readonly to = signal('');
  readonly page = signal(1);
  readonly drawerOpen = signal(false);

  // Bumped to force the DS inputs to re-render empty after "Clear all", since
  // they don't reliably reset when their bound value returns to ''.
  readonly filterKey = signal(0);

  constructor() {
    effect(() => {
      this.program();
      this.severity();
      this.status();
      this.from();
      this.to();
      this.page.set(1);
    });
  }

  readonly dateRangeError = computed(() => {
    const f = parseIsoDate(this.from());
    const t = parseIsoDate(this.to());
    return f && t && f > t ? 'The "from" date must be on or before the "to" date' : '';
  });

  readonly filtered = computed(() => {
    const program = this.program();
    const severity = this.severity();
    const status = this.status();
    const from = parseIsoDate(this.from());
    const toDate = parseIsoDate(this.to());
    const toEnd = toDate ? new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate() + 1) : null;

    return this.service.all().filter((n) => {
      if (program && n.programId !== program) return false;
      if (severity && n.severity !== severity) return false;
      if (status === 'active' && n.dismissed) return false;
      if (status === 'dismissed' && !n.dismissed) return false;
      if (from && n.createdAt < from) return false;
      if (toEnd && n.createdAt >= toEnd) return false;
      return true;
    });
  });

  readonly pageItems = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  readonly rangeLabel = computed(() => {
    const total = this.filtered().length;
    if (total === 0) return 'No notifications match your filters';
    const start = (this.page() - 1) * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, total);
    return `Showing ${start}–${end} of ${total} notifications`;
  });

  readonly chips = computed(() => {
    const chips: { key: 'program' | 'severity' | 'status' | 'from' | 'to'; label: string }[] = [];
    const p = PROGRAM_BY_ID.get(this.program());
    if (p) chips.push({ key: 'program', label: p.name });
    const s = SEVERITIES.find((x) => x.value === this.severity());
    if (s) chips.push({ key: 'severity', label: s.label });
    const st = STATUS_OPTIONS.find((x) => x.value === this.status());
    if (st) chips.push({ key: 'status', label: st.label });
    if (this.from()) chips.push({ key: 'from', label: `From ${this.fmt(this.from())}` });
    if (this.to()) chips.push({ key: 'to', label: `To ${this.fmt(this.to())}` });
    return chips;
  });

  onProgram(d: GoabDropdownOnChangeDetail): void {
    this.program.set(d.value ?? '');
  }

  onSeverity(d: GoabDropdownOnChangeDetail): void {
    this.severity.set(d.value ?? '');
  }

  onStatus(d: GoabDropdownOnChangeDetail): void {
    this.status.set((d.value ?? '') as Status);
  }

  onFrom(d: GoabDatePickerOnChangeDetail): void {
    this.from.set(d.valueStr ?? '');
  }

  onTo(d: GoabDatePickerOnChangeDetail): void {
    this.to.set(d.valueStr ?? '');
  }

  onPage(d: GoabPaginationOnChangeDetail): void {
    this.page.set(d.page);
  }

  removeChip(key: 'program' | 'severity' | 'status' | 'from' | 'to'): void {
    ({ program: this.program, severity: this.severity, status: this.status, from: this.from, to: this.to })[key].set('');
    this.filterKey.update((k) => k + 1);
  }

  clearAll(): void {
    this.program.set('');
    this.severity.set('');
    this.status.set('');
    this.from.set('');
    this.to.set('');
    this.filterKey.update((k) => k + 1);
  }

  private fmt(iso: string): string {
    return parseIsoDate(iso)?.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }) ?? iso;
  }
}
