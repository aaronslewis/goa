import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

export type NotificationType = 'emergency' | 'important' | 'information' | 'event';

export interface Notification {
  id: string;
  type: NotificationType;
  heading: string;
  body: string;
  timestamp: Date;
  dismissed?: boolean;
}

export interface WhatsNewItem {
  version: string;
  date: Date;
  heading: string;
  summary: string;
  service: string;
}

interface MenuLeaf {
  label: string;
  icon?: string;
  url?: string;
  current?: boolean;
}

interface MenuItem {
  kind: 'item';
  label: string;
  icon?: string;
  url?: string;
  current?: boolean;
  action?: string;
}

interface MenuGroup {
  kind: 'group';
  heading: string;
  icon: string;
  items: MenuLeaf[];
}

interface MenuDrill {
  kind: 'drill';
  label: string;
  icon: string;
  panel: string;
}

type MenuEntry = MenuItem | MenuGroup | MenuDrill;

@Component({
  selector: 'ecds-dashboard',
  standalone: true,
  imports: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ecds-dashboard.component.html',
  styleUrl: './ecds-dashboard.component.scss',
})
export class EcdsDashboardComponent implements AfterViewInit, OnDestroy {
  constructor(private router: Router, private el: ElementRef, private zone: NgZone) {}

  private observer?: MutationObserver;
  private hoverTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    const menu = this.el.nativeElement.querySelector('goa-work-side-menu');
    if (!menu) return;
    this.observer = new MutationObserver(() => {
      this.zone.run(() => {
        this.isMenuOpen = menu.hasAttribute('open');
      });
    });
    this.observer.observe(menu, { attributes: true, attributeFilter: ['open'] });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    clearTimeout(this.hoverTimer);
  }

  onMenuMouseEnter(): void {
    if (this.isMenuOpen) return;
    this.hoverTimer = setTimeout(() => {
      this.isMenuOpen = true;
    }, 700);
  }

  onMenuMouseLeave(): void {
    clearTimeout(this.hoverTimer);
  }

  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';

  readonly searchItem: MenuItem = { kind: 'item', label: 'Search', icon: 'search', url: '#' };
  readonly helpItem = { label: 'Help Centre', icon: 'help-circle', url: '#' };
  readonly accountMenuItems = [{ label: 'Sign out', icon: 'log-out', action: 'logout' as const }];

  onAccountAction(action: 'logout'): void {
    if (action === 'logout') this.router.navigate(['/']);
  }

  isMenuOpen = true;
  activePanel = 'root';
  activeSection: 'home' | string = 'home';

  private readonly panelTitles: Record<string, string> = {
    adminPenalties: 'Admin Penalties',
    certification: 'Certification',
    childRegistration: 'Child Registration',
    claims: 'Claims',
    funding: 'Funding',
    goaUserMgmt: 'GOA User Management',
    licensing: 'Licensing',
    postVerification: 'Post Verification',
    programUserMgmt: 'Program User Management',
    subsidy: 'Subsidy',
  };

  private readonly panels: Record<string, MenuEntry[]> = {
    root: [
      { kind: 'item', label: 'Home', icon: 'home', action: 'home', current: true },
      { kind: 'drill', label: 'Admin Penalties', icon: 'ticket', panel: 'adminPenalties' },
      { kind: 'drill', label: 'Certification', icon: 'ribbon', panel: 'certification' },
      { kind: 'drill', label: 'Child Registration', icon: 'id-card', panel: 'childRegistration' },
      { kind: 'drill', label: 'Claims', icon: 'list', panel: 'claims' },
      { kind: 'item', label: 'Family Portal', icon: 'home', url: '#' },
      { kind: 'drill', label: 'Funding', icon: 'file-tray-full', panel: 'funding' },
      { kind: 'drill', label: 'GOA User Management', icon: 'key', panel: 'goaUserMgmt' },
      { kind: 'drill', label: 'Licensing', icon: 'shield-checkmark', panel: 'licensing' },
      { kind: 'drill', label: 'Post Verification', icon: 'checkmark-done', panel: 'postVerification' },
      { kind: 'item', label: 'Registered Children Report', icon: 'document-text', url: '#' },
      { kind: 'drill', label: 'Subsidy', icon: 'body', panel: 'subsidy' },
    ],
    childRegistration: [
      { kind: 'item', label: 'Manage children', url: '#' },
      { kind: 'item', label: 'Resolve duplicates', url: '#' },
    ],
    certification: [
      { kind: 'item', label: 'Work Queue', icon: 'time', url: '#' },
      { kind: 'item', label: 'My Assignments', icon: 'person', url: '#' },
      { kind: 'item', label: 'Search', icon: 'search', url: '#' },
      { kind: 'item', label: 'Admin Data', icon: 'analytics', url: '#' },
    ],
    claims: [
      { kind: 'item', label: 'Assess Claims', url: '#' },
      { kind: 'item', label: 'Assess Adjustments', url: '#' },
      { kind: 'item', label: 'Submit Adjustments', url: '#' },
      { kind: 'item', label: 'Payment Statements', url: '#' },
    ],
    adminPenalties: [
      { kind: 'item', label: 'Penalties', url: '#' },
      { kind: 'item', label: 'Reports', url: '#' },
    ],
    funding: [
      {
        kind: 'group',
        heading: 'Affordability Grant',
        icon: 'shapes',
        items: [
          { label: 'Programs', url: '#' },
          { label: 'Agreement Management', url: '#' },
        ],
      },
      { kind: 'item', label: 'Agreement Configuration', icon: 'document-text', url: '#' },
      {
        kind: 'group',
        heading: 'Family Day Home Agency Contract',
        icon: 'home',
        items: [
          { label: 'Programs', url: '#' },
          { label: 'Contract Management', url: '#' },
        ],
      },
      { kind: 'item', label: 'Space Creation', icon: 'expand', url: '#' },
      {
        kind: 'group',
        heading: 'ECE Workforce Supports Grant',
        icon: 'server',
        items: [
          { label: 'Programs', url: '#' },
          { label: 'Agreement Management', url: '#' },
        ],
      },
    ],
    postVerification: [
      { kind: 'item', label: '30 Day Letter', url: '#' },
      { kind: 'item', label: 'Warning Letter', url: '#' },
      { kind: 'item', label: 'Suspension Letter', url: '#' },
      { kind: 'item', label: 'RoR - File Closure', url: '#' },
      { kind: 'item', label: 'RoR - Debt Recovery Team', url: '#' },
      { kind: 'item', label: 'Completed', url: '#' },
    ],
    goaUserMgmt: [
      { kind: 'item', label: 'GOA User Management', url: '#' },
      { kind: 'item', label: 'Identity and Access Management', url: '#' },
    ],
    licensing: [
      { kind: 'item', label: 'Dashboard', url: '#' },
      { kind: 'item', label: 'Child Care Program Search', url: '#' },
      { kind: 'item', label: 'Program Educator Search', url: '#' },
      { kind: 'item', label: 'People Search', url: '#' },
      { kind: 'item', label: 'Admin Data', url: '#' },
    ],
    programUserMgmt: [
      { kind: 'item', label: 'User Access Management', url: '#' },
      { kind: 'item', label: 'Legal Representative Management', url: '#' },
      { kind: 'item', label: 'Access Request', url: '#' },
      { kind: 'item', label: 'Removal Request', url: '#' },
    ],
    subsidy: [
      { kind: 'item', label: 'Work Queue', url: '#' },
      { kind: 'item', label: 'My Assignments', url: '#' },
      { kind: 'item', label: 'Subsidy Application Form', url: '#' },
    ],
  };

  get isRoot(): boolean {
    return this.activePanel === 'root';
  }

  get entries(): MenuEntry[] {
    return this.panels[this.activePanel];
  }

  get panelTitle(): string {
    return this.panelTitles[this.activePanel] ?? '';
  }

  get panelIcon(): string {
    const drill = this.panels['root'].find(
      e => e.kind === 'drill' && (e as MenuDrill).panel === this.activePanel
    ) as MenuDrill | undefined;
    return drill?.icon ?? '';
  }

  drillInto(panel: string): void {
    this.activePanel = panel;
    this.activeSection = panel;
  }

  backToRoot(): void {
    this.activePanel = 'root';
  }

  onNavItemSpace(event: Event, action: string | undefined, url: string | undefined): void {
    if (action) {
      event.preventDefault();
      this.onNavItem(action, url);
    }
  }

  onNavItem(action: string | undefined, url: string | undefined): void {
    if (action === 'home') {
      this.activeSection = 'home';
      this.updateRootCurrentItem('home');
    }
  }

  private updateRootCurrentItem(action: string): void {
    for (const entry of this.panels['root']) {
      if (entry.kind === 'item') {
        entry.current = entry.action === action;
      }
    }
  }

  // ── Notifications ─────────────────────────────────────────────────────────

  notifications: Notification[] = [
    {
      id: 'n1',
      type: 'emergency',
      heading: 'Calamari Kindergarden\'s licence will expire on Oct 12, 2026',
      body: 'Immediate action is required before the expiry date.',
      timestamp: new Date('2026-07-14T08:00:00'),
    },
    {
      id: 'n2',
      type: 'important',
      heading: 'Critical incident report submitted for Tiramisu Daycare',
      body: 'A new critical incident report has been submitted for Tiramisu Daycare and requires your attention.',
      timestamp: new Date('2026-07-14T09:00:00'),
    },
    {
      id: 'n3',
      type: 'important',
      heading: 'Dunder Mifflin Family Day Homes updated a non-compliance for review',
      body: 'A non-compliance record has been updated by Dunder Mifflin Family Day Homes and requires your review.',
      timestamp: new Date('2026-07-14T09:30:00'),
    },
    {
      id: 'n4',
      type: 'important',
      heading: 'Scott\'s Tots has 1 unresolved non-compliance',
      body: 'Action required before May 20, 2026.',
      timestamp: new Date('2026-07-14T10:00:00'),
    },
    {
      id: 'n5',
      type: 'information',
      heading: 'MSPC Daycare inspection needs to be completed',
      body: 'You have 1 draft inspection to complete for MSPC Daycare.',
      timestamp: new Date('2026-07-14T10:15:00'),
    },
    {
      id: 'n6',
      type: 'information',
      heading: 'Tiramisu Daycare insurance documentation expiring in a month',
      body: 'Insurance documentation for Tiramisu Daycare will expire on September 12, 2026.',
      timestamp: new Date('2026-07-14T10:30:00'),
    },
    {
      id: 'n7',
      type: 'information',
      heading: 'Scott\'s Tots uploaded a new document',
      body: 'Complaint Form was uploaded by Scott\'s Tots on July 14, 2026.',
      timestamp: new Date('2026-07-14T11:00:00'),
    },
  ];

  get activeNotifications(): Notification[] {
    return this.notifications.filter(n => !n.dismissed);
  }

  get notificationCount(): number {
    return this.activeNotifications.length;
  }

  dismissNotification(id: string): void {
    const n = this.notifications.find(x => x.id === id);
    if (n) n.dismissed = true;
  }

  containerType(type: NotificationType): string {
    const map: Record<NotificationType, string> = {
      emergency: 'error',
      important: 'important',
      information: 'info',
      event: 'info',
    };
    return map[type];
  }

  // ── Greeting & stats ──────────────────────────────────────────────────────

  readonly firstName = 'Edna';

  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  readonly today = new Date();

  readonly stats = [
    { label: 'Licences expiring soon', count: 1, accent: 'emergency', date: null },
    { label: 'Non-compliances requiring action', count: 2, accent: 'warning', date: null },
    { label: 'Draft inspections to complete', count: 1, accent: 'warning', date: null },
    { label: 'Critical incident reports', count: 1, accent: 'info', date: null },
  ];

  // ── My programs ──────────────────────────────────────────────────────────

  readonly myPrograms = [
    { name: 'Calamari Kindergarden', url: '#' },
    { name: 'Tiramisu Daycare', url: '#' },
    { name: 'MSPC Daycare', url: '#' },
    { name: 'Scott\'s Tots', url: '#' },
    { name: 'Dunder Mifflin Family Day Homes', url: '#' },
    { name: 'Rainbow Bridge Child Care', url: '#' },
    { name: 'Sunflower Learning Centre', url: '#' },
    { name: 'Little Explorers Daycare', url: '#' },
    { name: 'Maple Grove Child Care', url: '#' },
    { name: 'Bright Beginnings Preschool', url: '#' },
  ];

  // ── What's new ────────────────────────────────────────────────────────────

  readonly whatsNew: WhatsNewItem[] = [
    {
      version: '3.4',
      date: new Date('2026-06-20'),
      service: 'Certification',
      heading: 'Batch assignment for work queue items',
      summary:
        'Supervisors can now assign multiple work queue items to a caseworker in a single action, reducing manual effort.',
    },
    {
      version: '3.3',
      date: new Date('2026-06-06'),
      service: 'Child Registration',
      heading: 'Improved duplicate detection',
      summary:
        'The duplicate detection algorithm now surfaces higher-confidence matches first, cutting the false-positive rate by approximately 30%.',
    },
    {
      version: '3.2',
      date: new Date('2026-05-23'),
      service: 'Subsidy',
      heading: 'Custody court order attachments',
      summary:
        'Caseworkers can now upload and attach custody court order documents directly to a child record without leaving the subsidy workflow.',
    },
    {
      version: '3.1',
      date: new Date('2026-05-09'),
      service: 'Funding',
      heading: 'Affordability Grant agreement history',
      summary:
        'A full version history is now visible on each agreement record, showing who made changes and when.',
    },
  ];
}
