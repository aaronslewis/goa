import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  url?: string;
  current?: boolean;
}

interface MenuGroup {
  heading: string;
  icon: string;
  items: { label: string; url?: string; current?: boolean }[];
}

type MenuEntry = ({ kind: 'item' } & MenuItem) | ({ kind: 'group' } & MenuGroup);

@Component({
  selector: 'main-menu',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // goa-work-side-menu already wraps its whole nav (primary + secondary +
    // profile + the collapse toggle) in an internal <goa-scrollable> capped
    // to calc(100vh - <fixed chrome>), with its own overflow-y:auto — that's
    // the mechanism that used to scroll everything away together. Measuring
    // and reacting to it happens off its shadow DOM (no public API for this).
    const menu = this.el.nativeElement.querySelector('goa-work-side-menu');
    const shadow = menu?.shadowRoot;
    const nav = shadow?.querySelector('.menu');
    const scrollableDiv = shadow?.querySelector('goa-scrollable')?.shadowRoot?.querySelector('.goa-scrollable');
    const primaryScroll = this.el.nativeElement.querySelector('.primary-scroll');
    if (!nav || !scrollableDiv || !primaryScroll) return;

    // Each goa-work-side-menu-item/-group upgrades and renders its own
    // shadow DOM asynchronously, so the nav's real height keeps growing for
    // a few ticks after view init — measuring too early undercounts
    // "everything below the list" and caps this wrapper too generously,
    // which is exactly what let an outer scrollbar creep back in. Debounce
    // on resize until the nav stops growing (a one-time layout decision, not
    // a live binding to keep re-deriving), with a fixed-delay fallback for
    // contexts where ResizeObserver never fires (e.g. a backgrounded tab).
    let applied = false;
    const apply = () => {
      if (applied) return;
      applied = true;
      observer.disconnect();
      clearTimeout(settleTimer);
      clearTimeout(fallbackTimer);
      const budget = scrollableDiv.clientHeight;
      const belowPrimary = scrollableDiv.scrollHeight - primaryScroll.scrollHeight;
      this.el.nativeElement.style.setProperty('--primary-max-height', `${budget - belowPrimary}px`);
    };

    let settleTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(apply, 100);
    });
    observer.observe(nav);
    const fallbackTimer = setTimeout(apply, 500);
  }

  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';

  readonly searchItem: MenuItem = { label: 'Search', icon: 'search', url: '#' };

  readonly helpItem: MenuItem = { label: 'Help Centre', icon: 'help-circle', url: '#' };

  readonly notificationsItem: MenuItem = { label: 'Notifications', icon: 'notifications', url: '/notifications' };

  readonly accountMenuItems = [
    { label: 'My Profile', icon: 'person-circle', action: 'profile' as const },
    { label: 'Settings', icon: 'settings', action: 'settings' as const },
    { label: 'Log out', icon: 'log-out', action: 'logout' as const },
  ];

  onAccountAction(action: 'profile' | 'settings' | 'logout'): void {
    // Hook into router/auth when those exist; no-op for now.
  }

  readonly entries: MenuEntry[] = [
    {
      kind: 'group',
      heading: 'Administrative Penalties',
      icon: 'ticket',
      items: [
        { label: 'Penalties', url: '#' },
        { label: 'Reports', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Affordability Grant',
      icon: 'shapes',
      items: [
        { label: 'Programs', url: '#' },
        { label: 'Agreement Management', url: '#' },
      ],
    },
    { kind: 'item', label: 'Affordability Grant Financial Reporting', icon: 'bar-chart', url: '#' },
    { kind: 'item', label: 'Agreement Configuration', icon: 'documents', url: '#' },
    {
      kind: 'group',
      heading: 'Certification',
      icon: 'ribbon',
      items: [
        { label: 'Work Queue', url: '#' },
        { label: 'My Assignments', url: '#' },
        { label: 'Search', url: '#' },
        { label: 'Admin Data', url: '#' },
      ],
    },
    { kind: 'item', label: 'Child Registration', icon: 'id-card', url: '#' },
    {
      kind: 'group',
      heading: 'Claims',
      icon: 'list',
      items: [
        { label: 'Assess Claims', url: '#' },
        { label: 'Assess Adjustments', url: '#' },
        { label: 'Submit Adjustments', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Family Day Home Agency Contract',
      icon: 'home',
      items: [
        { label: 'Programs', url: '#' },
        { label: 'Contract Management', url: '#' },
      ],
    },
    { kind: 'item', label: 'Family Portal', icon: 'heart', url: '#' },
    { kind: 'item', label: 'GOA User Management', icon: 'key', url: '#' },
    { kind: 'item', label: 'Identity and Access Management', icon: 'lock-closed', url: '#' },
    {
      kind: 'group',
      heading: 'Licensing',
      icon: 'shield-checkmark',
      items: [
        { label: 'Dashboard', url: '#' },
        { label: 'Child Care Program Search', url: '#' },
        { label: 'Program Educator Search', url: '#' },
        { label: 'People Search', url: '#' },
        { label: 'Admin Data', url: '#' },
      ],
    },
    { kind: 'item', label: 'Payment Statements', icon: 'receipt', url: '#' },
    {
      kind: 'group',
      heading: 'Post Verification',
      icon: 'checkmark-done',
      items: [
        { label: '30 Day Letter', url: '#' },
        { label: 'Warning Letter', url: '#' },
        { label: 'Suspension Letter', url: '#' },
        { label: 'RoR - File Closure', url: '#' },
        { label: 'RoR - Debt Recovery Team', url: '#' },
        { label: 'Completed', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Program User Management',
      icon: 'finger-print',
      items: [
        { label: 'User Access Management', url: '#' },
        { label: 'Legal Representative Management', url: '#' },
        { label: 'Access Request', url: '#' },
        { label: 'Removal Request', url: '#' },
      ],
    },
    { kind: 'item', label: 'Space Creation', icon: 'expand', url: '#' },
    { kind: 'item', label: 'Registered Children Report', icon: 'document-text', url: '#' },
    {
      kind: 'group',
      heading: 'Subsidy',
      icon: 'body',
      items: [
        { label: 'Work Queue', url: '#', current: true },
        { label: 'My Assignments', url: '#' },
        { label: 'Subsidy Application Form', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'ECE Workforce Supports',
      icon: 'server',
      items: [
        { label: 'Programs', url: '#' },
        { label: 'Agreement Management', url: '#' },
      ],
    },
  ];
}
