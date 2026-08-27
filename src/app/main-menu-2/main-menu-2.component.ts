import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoabIconType } from '@abgov/ui-components-common';
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabIcon,
} from '@abgov/angular-components';

interface MenuLeaf {
  label: string;
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

// A drill-in entry: clicking it swaps the menu to another panel (third layer),
// mirroring the "Back to all" drill-down pattern on design.alberta.ca.
interface MenuDrill {
  kind: 'drill';
  label: string;
  icon: GoabIconType;
  panel: string;
}

type MenuEntry = MenuItem | MenuGroup | MenuDrill;

@Component({
  selector: 'main-menu-2',
  standalone: true,
  imports: [GoabWorkSideMenu, GoabWorkSideMenuGroup, GoabWorkSideMenuItem, GoabIcon],
  templateUrl: './main-menu-2.component.html',
  styleUrl: './main-menu-2.component.scss',
})
export class MainMenu2Component {
  constructor(private router: Router) {}

  private hoverTimer?: ReturnType<typeof setTimeout>;

  // goab-work-side-menu's (onToggle) emits void, not an open/closed payload,
  // so this is the source of truth for whether the menu is expanded.
  onMenuToggle(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuMouseEnter(): void {
    if (this.isMenuOpen) return;
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
    certification: [
      { kind: 'item', label: 'Admin Data', url: '#' },
      { kind: 'item', label: 'My Assignments', url: '#' },
      { kind: 'item', label: 'Search', url: '#' },
      { kind: 'item', label: 'Work Queue', url: '#' },
    ],
    claims: [
      { kind: 'item', label: 'Assess Adjustments', url: '#' },
      { kind: 'item', label: 'Assess Claims', url: '#' },
      { kind: 'item', label: 'Payment Statements', url: '#' },
      { kind: 'item', label: 'Submit Adjustments', url: '#' },
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
          { label: 'Agreement Management', url: '#' },
          { label: 'Programs', url: '#' },
        ],
      },
      { kind: 'item', label: 'Affordability Grant Financial Reporting', icon: 'bar-chart:outline', url: '#' },
      { kind: 'item', label: 'Agreement Configuration', icon: 'documents:outline', url: '#' },
      {
        kind: 'group',
        heading: 'ECE Workforce Supports',
        icon: 'server:outline',
        items: [
          { label: 'Agreement Management', url: '#' },
          { label: 'Programs', url: '#' },
        ],
      },
      {
        kind: 'group',
        heading: 'Family Day Home Agency Contract',
        icon: 'home:outline',
        items: [
          { label: 'Contract Management', url: '#' },
          { label: 'Programs', url: '#' },
        ],
      },
      { kind: 'item', label: 'Space Creation', icon: 'expand:outline', url: '#' },
    ],
    postVerification: [
      { kind: 'item', label: '30 Day Letter', url: '#' },
      { kind: 'item', label: 'Completed', url: '#' },
      { kind: 'item', label: 'RoR - Debt Recovery Team', url: '#' },
      { kind: 'item', label: 'RoR - File Closure', url: '#' },
      { kind: 'item', label: 'Suspension Letter', url: '#' },
      { kind: 'item', label: 'Warning Letter', url: '#' },
    ],
    goaUserMgmt: [
      { kind: 'item', label: 'GOA User Management', url: '#' },
      { kind: 'item', label: 'Identity and Access Management', url: '#' },
    ],
    licensing: [
      { kind: 'item', label: 'Admin Data', url: '#' },
      { kind: 'item', label: 'Child Care Program Search', url: '#' },
      { kind: 'item', label: 'Dashboard', url: '#' },
      { kind: 'item', label: 'People Search', url: '#' },
      { kind: 'item', label: 'Program Educator Search', url: '#' },
    ],
    programUserMgmt: [
      { kind: 'item', label: 'Access Request', url: '#' },
      { kind: 'item', label: 'Legal Representative Management', url: '#' },
      { kind: 'item', label: 'Removal Request', url: '#' },
      { kind: 'item', label: 'User Access Management', url: '#' },
    ],
    subsidy: [
      { kind: 'item', label: 'My Assignments', url: '#' },
      { kind: 'item', label: 'Subsidy Application Form', url: '#' },
      { kind: 'item', label: 'Work Queue', url: '#', current: true },
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

  drillInto(panel: string): void {
    this.activePanel = panel;
  }

  backToRoot(): void {
    this.activePanel = 'root';
  }
}
