import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
  GoabContainer,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFilterChip,
  GoabFormItem,
  GoabPagination,
} from '@abgov/angular-components';
import { GoabDatePickerOnChangeDetail, GoabPaginationOnChangeDetail } from '@abgov/ui-components-common';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationFeedComponent } from '../notification-feed/notification-feed.component';
import { AddNotificationDrawerComponent } from '../add-notification-drawer/add-notification-drawer.component';
import { NotificationsService } from '../notifications.service';
import { HubVariant } from '../hub-variant';
import { PROGRAMS, PROGRAM_BY_ID, SERVICES, SEVERITIES } from '../notifications.data';

const PAGE_SIZE = 20;
const FILTER_DRAWER_SETTLE_MS = 300;

type Status = '' | 'active' | 'dismissed';

type FilterKey = keyof Filters;

interface Filters {
  service: string;
  program: string;
  severity: string;
  status: Status;
  from: string;
  to: string;
}

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
    GoabButtonGroup,
    GoabContainer,
    GoabDatePicker,
    GoabDrawer,
    GoabDropdown,
    GoabDropdownItem,
    GoabFilterChip,
    GoabFormItem,
    GoabPagination,
    NotificationListComponent,
    NotificationFeedComponent,
    AddNotificationDrawerComponent,
  ],
  templateUrl: './hub-notifications-page.component.html',
  styleUrl: './hub-notifications-page.component.scss',
})
export class HubNotificationsPageComponent {
  readonly service = inject(NotificationsService);
  readonly hub = inject(HubVariant);

  readonly services = SERVICES;
  readonly programs = PROGRAMS;
  readonly severities = SEVERITIES;
  readonly statusOptions = STATUS_OPTIONS;
  readonly pageSize = PAGE_SIZE;

  readonly serviceFilter = signal('');
  readonly program = signal('');
  readonly severity = signal('');
  readonly status = signal<Status>('');
  readonly from = signal('');
  readonly to = signal('');
  readonly page = signal(1);
  readonly drawerOpen = signal(false);

  // The filter drawer edits a draft; nothing changes on the page until Apply.
  readonly filtersOpen = signal(false);
  // goa-dropdown ignores a value it receives before its items register, which
  // happens as the drawer finishes sliding in (a single tick isn't always
  // enough), so the fields take the draft values once it's open.
  readonly filtersReady = signal(false);
  draft: Filters = { service: '', program: '', severity: '', status: '', from: '', to: '' };
  private readonly draftFrom = signal('');
  private readonly draftTo = signal('');

  constructor() {
    effect(() => {
      this.serviceFilter();
      this.program();
      this.severity();
      this.status();
      this.from();
      this.to();
      this.page.set(1);
    });
  }

  readonly draftDateError = computed(() => {
    const f = parseIsoDate(this.draftFrom());
    const t = parseIsoDate(this.draftTo());
    return f && t && f > t ? 'The "from" date must be on or before the "to" date' : '';
  });

  readonly filtered = computed(() => {
    const service = this.serviceFilter();
    const program = this.program();
    const severity = this.severity();
    const status = this.status();
    const from = parseIsoDate(this.from());
    const toDate = parseIsoDate(this.to());
    const toEnd = toDate ? new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate() + 1) : null;

    return this.service.all().filter((n) => {
      if (service && n.service !== service) return false;
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
    const chips: { key: FilterKey; label: string }[] = [];
    const p = PROGRAM_BY_ID.get(this.program());
    if (p) chips.push({ key: 'program', label: p.name });
    const sv = SERVICES.find((x) => x.value === this.serviceFilter());
    if (sv) chips.push({ key: 'service', label: sv.label });
    const s = SEVERITIES.find((x) => x.value === this.severity());
    if (s) chips.push({ key: 'severity', label: s.label });
    const st = STATUS_OPTIONS.find((x) => x.value === this.status());
    if (st) chips.push({ key: 'status', label: st.label });
    if (this.from()) chips.push({ key: 'from', label: `From ${this.fmt(this.from())}` });
    if (this.to()) chips.push({ key: 'to', label: `To ${this.fmt(this.to())}` });
    return chips;
  });

  openFilters(): void {
    this.draft = {
      service: this.serviceFilter(),
      program: this.program(),
      severity: this.severity(),
      status: this.status(),
      from: this.from(),
      to: this.to(),
    };
    this.draftFrom.set(this.draft.from);
    this.draftTo.set(this.draft.to);
    this.filtersReady.set(false);
    this.filtersOpen.set(true);
    setTimeout(() => this.filtersReady.set(true), FILTER_DRAWER_SETTLE_MS);
  }

  onDraftFrom(d: GoabDatePickerOnChangeDetail): void {
    this.draft.from = d.valueStr ?? '';
    this.draftFrom.set(this.draft.from);
  }

  onDraftTo(d: GoabDatePickerOnChangeDetail): void {
    this.draft.to = d.valueStr ?? '';
    this.draftTo.set(this.draft.to);
  }

  applyFilters(): void {
    if (this.draftDateError()) return;
    this.serviceFilter.set(this.draft.service);
    this.program.set(this.draft.program);
    this.severity.set(this.draft.severity);
    this.status.set(this.draft.status);
    this.from.set(this.draft.from);
    this.to.set(this.draft.to);
    this.filtersOpen.set(false);
  }

  closeFilters(): void {
    this.filtersOpen.set(false);
  }

  onPage(d: GoabPaginationOnChangeDetail): void {
    this.page.set(d.page);
  }

  removeChip(key: FilterKey): void {
    ({ service: this.serviceFilter, program: this.program, severity: this.severity, status: this.status, from: this.from, to: this.to })[key].set('');
  }

  clearAll(): void {
    this.serviceFilter.set('');
    this.program.set('');
    this.severity.set('');
    this.status.set('');
    this.from.set('');
    this.to.set('');
  }

  private fmt(iso: string): string {
    return parseIsoDate(iso)?.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }) ?? iso;
  }
}
