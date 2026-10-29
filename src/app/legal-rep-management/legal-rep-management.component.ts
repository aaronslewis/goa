import { AfterViewInit, Component, ElementRef, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  GoabBlock,
  GoabButton,
  GoabFormItem,
  GoabIcon,
  GoabIconButton,
  GoabInput,
  GoabMicrositeHeader,
  GoabTab,
  GoabTable,
  GoabTableSortHeader,
  GoabTabs,
  GoabTemporaryNotificationCtrl,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from '@abgov/angular-components';
import {
  GoabIconType,
  GoabInputOnChangeDetail,
  GoabInputOnKeyPressDetail,
  GoabTableOnSortDetail,
  GoabTabsOnChangeDetail,
  TemporaryNotification,
} from '@abgov/ui-components-common';
import { hideWorkSideMenuScrollbarButtons } from '../shared/hide-work-side-menu-scrollbar-buttons';
import {
  DateRange,
  LEGAL_REP_EMAILS,
  LegalRepEmail,
  TODAY,
  formatEmailDate,
  inDateRange,
} from './legal-rep-management.data';

interface MenuEntry {
  label: string;
  icon: GoabIconType;
  url?: string;
  items?: { label: string; url?: string; current?: boolean }[];
}

type TileFilter = 'all' | 'not-sent' | 'sent' | 'not-created' | 'created' | 'not-confirmed';

interface Tile {
  filter: TileFilter;
  label: string;
  icon: GoabIconType;
  tone: 'info' | 'emergency' | 'success' | 'warning';
}

interface TileGroup {
  heading: string;
  tiles: Tile[];
}

type SortKey = 'program' | 'rep' | 'emailDate';

const DATE_RANGES: { range: DateRange; label: string }[] = [
  { range: 'today', label: `Today · ${formatEmailDate(TODAY)}` },
  { range: '7', label: 'Past 7 days' },
  { range: '30', label: 'Past 30 days' },
  { range: 'all', label: 'All' },
];

const matchesTile: Record<TileFilter, (e: LegalRepEmail) => boolean> = {
  all: () => true,
  'not-sent': (e) => e.emailStatus !== 'sent',
  sent: (e) => e.emailStatus === 'sent',
  'not-created': (e) => e.account === 'not-created',
  created: (e) => e.account === 'created',
  'not-confirmed': (e) => e.ack === 'not-confirmed',
};

const sortValue: Record<SortKey, (e: LegalRepEmail) => string> = {
  program: (e) => e.program.name,
  rep: (e) => e.rep.name,
  emailDate: (e) => e.emailDate,
};

@Component({
  selector: 'app-legal-rep-management',
  standalone: true,
  host: { class: 'goa-ds-v2' },
  imports: [
    NgTemplateOutlet,
    RouterLink,
    GoabBlock,
    GoabButton,
    GoabFormItem,
    GoabIcon,
    GoabIconButton,
    GoabInput,
    GoabMicrositeHeader,
    GoabTab,
    GoabTable,
    GoabTableSortHeader,
    GoabTabs,
    GoabTemporaryNotificationCtrl,
    GoabWorkSideMenu,
    GoabWorkSideMenuGroup,
    GoabWorkSideMenuItem,
  ],
  templateUrl: './legal-rep-management.component.html',
  styleUrl: './legal-rep-management.component.scss',
})
export class LegalRepManagementComponent implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    hideWorkSideMenuScrollbarButtons(this.el.nativeElement);
  }

  readonly formatEmailDate = formatEmailDate;
  readonly dateRanges = DATE_RANGES;

  readonly menuEntries: MenuEntry[] = [
    { label: 'Administrative Penalties', icon: 'ticket:outline', items: [{ label: 'Penalties' }, { label: 'Reports' }] },
    { label: 'Affordability Grant', icon: 'pie-chart:outline', items: [{ label: 'Programs' }, { label: 'Agreement Management' }] },
    { label: 'Agreement Configuration', icon: 'documents:outline' },
    { label: 'Certification', icon: 'ribbon:outline', items: [{ label: 'Applications' }, { label: 'Certificates' }] },
    { label: 'Child Registration', icon: 'id-card:outline' },
    { label: 'Claims', icon: 'list:outline', items: [{ label: 'Assess Claims' }, { label: 'Assess Adjustments' }] },
    { label: 'ECE Workforce Supports', icon: 'school:outline', items: [{ label: 'Wage Top-Up' }, { label: 'Professional Development' }] },
    { label: 'Family Day Home Agency Contract', icon: 'business:outline', items: [{ label: 'Agencies' }, { label: 'Contracts' }] },
    { label: 'Financial Services', icon: 'wallet:outline', items: [{ label: 'Payments' }, { label: 'Recoveries' }] },
    { label: 'Funding Assessment', icon: 'calculator:outline' },
    { label: 'GOA User Management', icon: 'key:outline' },
    { label: 'Identity and Access Management', icon: 'lock-closed:outline' },
    { label: 'Licensing', icon: 'shield-checkmark:outline', items: [{ label: 'Dashboard' }, { label: 'Child Care Program Search' }] },
    { label: 'Payment Statements', icon: 'receipt:outline' },
    { label: 'Post Verification', icon: 'checkbox:outline' },
    {
      label: 'Program User Management',
      icon: 'finger-print:outline',
      items: [
        { label: 'User Access Management', url: '#/uam-program-summary' },
        { label: 'Legal Representative Management', url: '#/legal-rep-management', current: true },
      ],
    },
    { label: 'Registered Children Report', icon: 'document-text:outline' },
    { label: 'Space Creation', icon: 'expand:outline' },
    { label: 'Subsidy', icon: 'cash:outline', items: [{ label: 'Applications' }, { label: 'Payments' }] },
  ];

  readonly tileGroups: TileGroup[] = [
    { heading: 'Portal emails', tiles: [{ filter: 'all', label: 'Total emails', icon: 'send', tone: 'info' }] },
    {
      heading: 'Email status',
      tiles: [
        { filter: 'not-sent', label: 'Not sent', icon: 'alert-circle', tone: 'emergency' },
        { filter: 'sent', label: 'Successful', icon: 'checkmark-circle', tone: 'success' },
      ],
    },
    {
      heading: 'Portal accounts',
      tiles: [
        { filter: 'not-created', label: 'Not created', icon: 'ellipsis-horizontal-circle', tone: 'warning' },
        { filter: 'created', label: 'Created', icon: 'checkmark-circle', tone: 'success' },
      ],
    },
    {
      heading: 'Acknowledgements',
      tiles: [{ filter: 'not-confirmed', label: 'Not confirmed', icon: 'ellipsis-horizontal-circle', tone: 'warning' }],
    },
  ];

  isMenuOpen = true;

  readonly emails = signal<LegalRepEmail[]>(LEGAL_REP_EMAILS);
  readonly dateRange = signal<DateRange>('today');
  readonly tileFilter = signal<TileFilter>('all');
  // The search box edits a draft; the table only filters on Search or Enter.
  searchDraft = '';
  readonly searchQuery = signal('');
  readonly sortBy = signal<SortKey | null>(null);
  readonly sortDir = signal(1);
  readonly expanded = signal<ReadonlySet<string>>(new Set());

  // Tile counts follow the date range only, so a tile keeps its number while
  // it's the one filtering the table.
  readonly inRange = computed(() => this.emails().filter((e) => inDateRange(e.emailDate, this.dateRange())));

  readonly counts = computed(() => {
    const rows = this.inRange();
    return Object.fromEntries(
      (Object.keys(matchesTile) as TileFilter[]).map((f) => [f, rows.filter(matchesTile[f]).length])
    ) as Record<TileFilter, number>;
  });

  readonly rows = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const rows = this.inRange()
      .filter(matchesTile[this.tileFilter()])
      .filter(
        (e) =>
          !q ||
          [e.org.name, e.org.id, e.program.name, e.program.id, e.rep.name, e.rep.email].some((v) =>
            v.toLowerCase().includes(q)
          )
      );
    const key = this.sortBy();
    if (!key) return rows;
    const dir = this.sortDir();
    return [...rows].sort((a, b) => sortValue[key](a).localeCompare(sortValue[key](b)) * dir);
  });

  onDateRangeChange(detail: GoabTabsOnChangeDetail): void {
    this.dateRange.set(DATE_RANGES[detail.tab - 1].range);
  }

  selectTile(filter: TileFilter): void {
    this.tileFilter.set(filter);
  }

  onSearchChange(detail: GoabInputOnChangeDetail): void {
    this.searchDraft = detail.value;
    // Clearing the field with its X resets the table without needing Search.
    if (!detail.value) this.applySearch();
  }

  onSearchKeyPress(detail: GoabInputOnKeyPressDetail): void {
    if (detail.key !== 'Enter') return;
    // onChange can lag the keypress, so take the value from the keypress itself.
    this.searchDraft = detail.value;
    this.applySearch();
  }

  applySearch(): void {
    this.searchQuery.set(this.searchDraft);
  }

  sortDirFor(key: SortKey): 'asc' | 'desc' | 'none' {
    if (this.sortBy() !== key) return 'none';
    return this.sortDir() === 1 ? 'asc' : 'desc';
  }

  onSort(detail: GoabTableOnSortDetail): void {
    this.sortBy.set(detail.sortBy as SortKey);
    this.sortDir.set(detail.sortDir);
  }

  isExpanded(id: string): boolean {
    return this.expanded().has(id);
  }

  toggleRow(id: string): void {
    const next = new Set(this.expanded());
    if (!next.delete(id)) next.add(id);
    this.expanded.set(next);
  }

  // Re-sending queues the email again; the prototype marks it sent straight away.
  resend(email: LegalRepEmail): void {
    this.emails.update((all) =>
      all.map((e) =>
        e.id === email.id
          ? { ...e, emailDate: TODAY, emailSentAt: 'Mar 19, 2026 12:05 pm MDT', emailStatus: 'sent' as const }
          : e
      )
    );
    TemporaryNotification.show(`Email re-sent to ${email.rep.name}`, { type: 'success' });
  }
}
