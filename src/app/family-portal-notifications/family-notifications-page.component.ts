import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  GoabBadge,
  GoabContainer,
  GoabDatePicker,
  GoabButton,
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
import { CompactDatePickerDirective } from '../notifications-hub/compact-date-picker.directive';
import { NotificationFeedComponent } from '../notifications-hub/notification-feed/notification-feed.component';
import { NotificationsService } from '../notifications-hub/notifications.service';
import { SEVERITIES } from '../notifications-hub/notifications.data';
import { FAMILY_SUBJECTS } from './family-notifications.data';

const PAGE_SIZE = 20;

type Status = '' | 'active' | 'dismissed';
type FilterKey = 'subject' | 'severity' | 'status' | 'from' | 'to';

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'dismissed', label: 'Completed' },
];

const SUBJECT_BY_ID = new Map(FAMILY_SUBJECTS.map((s) => [s.id, s]));

function parseIsoDate(s: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.slice(0, 10).split('-').map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
}

// Mirrors ProviderNotificationsPageComponent, with an "About" filter (the
// parent or one of the children) in place of the provider's program filter.
@Component({
  selector: 'family-notifications-page',
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
    NotificationFeedComponent,
  ],
  templateUrl: './family-notifications-page.component.html',
  styleUrl: './family-notifications-page.component.scss',
})
export class FamilyNotificationsPageComponent {
  readonly service = inject(NotificationsService);

  readonly subjects = FAMILY_SUBJECTS;
  // Only the severities a parent can receive, so no filter option is empty.
  readonly severities = SEVERITIES.filter((s) => this.service.all().some((n) => n.severity === s.value));
  readonly statusOptions = STATUS_OPTIONS;
  readonly pageSize = PAGE_SIZE;

  readonly subject = signal('');
  readonly severity = signal('');
  readonly status = signal<Status>('');
  readonly from = signal('');
  readonly to = signal('');
  readonly page = signal(1);

  // Bumped to force the DS inputs to re-render empty after "Clear all", since
  // they don't reliably reset when their bound value returns to ''.
  readonly filterKey = signal(0);

  constructor() {
    effect(() => {
      this.subject();
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
    const subject = this.subject();
    const severity = this.severity();
    const status = this.status();
    const from = parseIsoDate(this.from());
    const toDate = parseIsoDate(this.to());
    const toEnd = toDate ? new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate() + 1) : null;

    return this.service.all().filter((n) => {
      if (subject && n.programId !== subject) return false;
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
    const chips: { key: FilterKey; label: string }[] = [];
    const subject = SUBJECT_BY_ID.get(this.subject());
    if (subject) chips.push({ key: 'subject', label: `About ${subject.name}` });
    const s = SEVERITIES.find((x) => x.value === this.severity());
    if (s) chips.push({ key: 'severity', label: s.label });
    const st = STATUS_OPTIONS.find((x) => x.value === this.status());
    if (st) chips.push({ key: 'status', label: st.label });
    if (this.from()) chips.push({ key: 'from', label: `From ${this.fmt(this.from())}` });
    if (this.to()) chips.push({ key: 'to', label: `To ${this.fmt(this.to())}` });
    return chips;
  });

  onSubject(d: GoabDropdownOnChangeDetail): void {
    this.subject.set(d.value ?? '');
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

  removeChip(key: FilterKey): void {
    ({ subject: this.subject, severity: this.severity, status: this.status, from: this.from, to: this.to })[key].set('');
    this.filterKey.update((k) => k + 1);
  }

  clearAll(): void {
    this.subject.set('');
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
