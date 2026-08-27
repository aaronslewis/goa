import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoabIconType } from '@abgov/ui-components-common';
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabIcon,
} from '@abgov/angular-components';
import { setUpWorkSideMenuScrollFix } from '../shared/work-side-menu-scroll-fix';

interface MenuLeaf {
  label: string;
  icon?: GoabIconType;
  url?: string;
  current?: boolean;
}

interface MenuItem {
  kind: 'item';
  label: string;
  icon?: GoabIconType;
  url?: string;
  current?: boolean;
}

interface MenuGroup {
  kind: 'group';
  heading: string;
  icon: GoabIconType;
  items: MenuLeaf[];
}

interface MenuDrill {
  kind: 'drill';
  label: string;
  icon: GoabIconType;
  panel: string;
}

type MenuEntry = MenuItem | MenuGroup | MenuDrill;

// Panels that show a hover flyout in the collapsed rail instead of a single icon.
const PANELS_WITH_FLYOUT = new Set(['certification']);

@Component({
  selector: 'main-menu-3',
  standalone: true,
  imports: [GoabWorkSideMenu, GoabWorkSideMenuGroup, GoabWorkSideMenuItem, GoabIcon],
  templateUrl: './main-menu-3.component.html',
  styleUrl: './main-menu-3.component.scss',
})
export class MainMenu3Component implements AfterViewInit {
  constructor(private router: Router, private el: ElementRef<HTMLElement>) {}

  private hoverTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    setUpWorkSideMenuScrollFix(this.el.nativeElement);
  }

  // goab-work-side-menu's (onToggle) emits void, not an open/closed payload,
  // so this is the source of truth for whether the menu is expanded.
  onMenuToggle(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuMouseEnter(): void {
    if (this.isMenuOpen) return;
    if (this.hasFlyout) return; // flyout handles collapsed hover; don't auto-expand
    this.hoverTimer = setTimeout(() => { this.isMenuOpen = true; }, 700);
  }

  onMenuMouseLeave(): void {
    clearTimeout(this.hoverTimer);
  }

  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';

  readonly searchItem: MenuItem = { kind: 'item', label: 'Search', icon: 'search:outline', url: '#' };
  readonly helpItem = { label: 'Help Centre', icon: 'help-circle:outline' as GoabIconType, url: '#' };
  readonly notificationsItem = { label: 'Notifications', icon: 'notifications:outline' as GoabIconType, url: '/notifications' };
  readonly accountMenuItems = [
    { label: 'My Profile', icon: 'person-circle:outline' as GoabIconType, action: 'profile' as const },
    { label: 'Sign out', icon: 'log-out:outline' as GoabIconType, action: 'logout' as const },
  ];

  onAccountAction(action: 'profile' | 'logout'): void {
    if (action === 'logout') {
      this.router.navigate(['/']);
    }
  }

  isMenuOpen = true;
  activePanel = 'root';

  private readonly panelTitles: Record<string, string> = {
    adminPenalties: 'Administrative Penalties',
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
      { kind: 'drill', label: 'Administrative Penalties', icon: 'ticket:outline', panel: 'adminPenalties' },
      { kind: 'drill', label: 'Certification', icon: 'ribbon:outline', panel: 'certification' },
      { kind: 'drill', label: 'Child Registration', icon: 'id-card:outline', panel: 'childRegistration' },
      { kind: 'drill', label: 'Claims', icon: 'list:outline', panel: 'claims' },
      { kind: 'item', label: 'Family Portal', icon: 'people:outline', url: '#' },
      { kind: 'drill', label: 'Funding', icon: 'file-tray-full:outline', panel: 'funding' },
      { kind: 'drill', label: 'GOA User Management', icon: 'key:outline', panel: 'goaUserMgmt' },
      { kind: 'drill', label: 'Licensing', icon: 'shield-checkmark:outline', panel: 'licensing' },
      { kind: 'drill', label: 'Post Verification', icon: 'checkmark-done:outline', panel: 'postVerification' },
      { kind: 'drill', label: 'Program User Management', icon: 'finger-print:outline', panel: 'programUserMgmt' },
      { kind: 'item', label: 'Registered Children Report', icon: 'document-text:outline', url: '#' },
      { kind: 'drill', label: 'Subsidy', icon: 'body:outline', panel: 'subsidy' },
    ],
    childRegistration: [
      { kind: 'item', label: 'Manage children', url: '#' },
      { kind: 'item', label: 'Resolve duplicates', url: '#' },
    ],
    // Abstract icons represent each item when the rail is collapsed.
    certification: [
      { kind: 'item', label: 'Work Queue', icon: 'time:outline', url: '#' },
      { kind: 'item', label: 'My Assignments', icon: 'person:outline', url: '#' },
      { kind: 'item', label: 'Search', icon: 'search:outline', url: '#' },
      { kind: 'item', label: 'Admin Data', icon: 'analytics:outline', url: '#' },
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
        icon: 'pie-chart:outline',
        items: [
          { label: 'Programs', url: '#' },
          { label: 'Agreement Management', url: '#' },
        ],
      },
      { kind: 'item', label: 'Affordability Grant Financial Reporting', icon: 'bar-chart:outline', url: '#' },
      { kind: 'item', label: 'Agreement Configuration', icon: 'documents:outline', url: '#' },
      {
        kind: 'group',
        heading: 'Family Day Home Agency Contract',
        icon: 'home:outline',
        items: [
          { label: 'Programs', url: '#' },
          { label: 'Contract Management', url: '#' },
        ],
      },
      { kind: 'item', label: 'Space Creation', icon: 'expand:outline', url: '#' },
      {
        kind: 'group',
        heading: 'ECE Workforce Supports',
        icon: 'server:outline',
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
      { kind: 'item', label: 'Work Queue', url: '#', current: true },
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

  get panelIcon(): GoabIconType | undefined {
    const drill = this.panels['root'].find(
      e => e.kind === 'drill' && e.panel === this.activePanel
    ) as MenuDrill | undefined;
    return drill?.icon;
  }

  showFlyout = false;
  flyoutTop = 0;
  flyoutLeft = 0;

  get hasFlyout(): boolean {
    return PANELS_WITH_FLYOUT.has(this.activePanel);
  }

  onFlyoutHostEnter(event: MouseEvent): void {
    const host = event.currentTarget as HTMLElement;
    const rect = host.getBoundingClientRect();
    this.flyoutTop = rect.top;
    this.flyoutLeft = rect.right + 4;
    this.showFlyout = true;
  }

  onFlyoutHostLeave(): void {
    this.showFlyout = false;
  }

  drillInto(panel: string): void {
    this.activePanel = panel;
    if (PANELS_WITH_FLYOUT.has(panel)) {
      // goa-work-side-menu-group uses an internal <details> element that
      // doesn't respond to an open attribute — force it open once rendered.
      // goab-work-side-menu-group is a real Angular component wrapping that
      // same goa-work-side-menu-group underneath, so this reaches one level
      // deeper than the plain v1 usage did — and, like everything else built
      // on these goab-* wrappers, the group gates its own first render
      // behind an async "isReady" flip, so the element (and its shadow DOM)
      // may not exist for a tick or several after this runs. A single
      // setTimeout (which sufficed for v1's near-instant custom element
      // upgrade) isn't reliably enough time here — wait for it instead.
      const tryOpen = (): boolean => {
        const details = this.el.nativeElement
          .querySelector('goab-work-side-menu-group')
          ?.querySelector('goa-work-side-menu-group')
          ?.shadowRoot?.querySelector('details');
        if (!details) return false;
        details.open = true;
        return true;
      };
      if (!tryOpen()) {
        const observer = new MutationObserver(() => {
          if (tryOpen()) observer.disconnect();
        });
        observer.observe(this.el.nativeElement, { childList: true, subtree: true });
      }
    }
  }

  backToRoot(): void {
    this.activePanel = 'root';
  }
}
