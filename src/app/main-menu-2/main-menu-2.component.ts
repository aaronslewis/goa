import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

interface MenuLeaf {
  label: string;
  url?: string;
  current?: boolean;
}

interface MenuItem {
  kind: 'item';
  label: string;
  icon?: string;
  url?: string;
  current?: boolean;
}

interface MenuGroup {
  kind: 'group';
  heading: string;
  icon: string;
  items: MenuLeaf[];
}

// A drill-in entry: clicking it swaps the menu to another panel (third layer),
// mirroring the "Back to all" drill-down pattern on design.alberta.ca.
interface MenuDrill {
  kind: 'drill';
  label: string;
  icon: string;
  panel: string;
}

type MenuEntry = MenuItem | MenuGroup | MenuDrill;

@Component({
  selector: 'main-menu-2',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main-menu-2.component.html',
  styleUrl: './main-menu-2.component.scss',
})
export class MainMenu2Component {
  constructor(private router: Router) {}

  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';

  readonly searchItem: MenuItem = { kind: 'item', label: 'Search', icon: 'search', url: '#' };

  readonly helpItem = { label: 'Help Centre', icon: 'help-circle', url: '#' };

  readonly accountMenuItems = [
    { label: 'Settings', icon: 'settings', action: 'settings' as const },
    { label: 'Sign out', icon: 'log-out', action: 'logout' as const },
  ];

  onAccountAction(action: 'settings' | 'logout'): void {
    if (action === 'logout') {
      this.router.navigate(['/']);
    }
  }

  isMenuOpen = true;

  activePanel = 'root';

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
      { kind: 'drill', label: 'Admin Penalties', icon: 'pricetag', panel: 'adminPenalties' },
      { kind: 'drill', label: 'Certification', icon: 'ribbon', panel: 'certification' },
      { kind: 'drill', label: 'Child Registration', icon: 'id-card', panel: 'childRegistration' },
      { kind: 'drill', label: 'Claims', icon: 'list', panel: 'claims' },
      { kind: 'item', label: 'Family Portal', icon: 'home', url: '#' },
      { kind: 'drill', label: 'Funding', icon: 'file-tray-full', panel: 'funding' },
      { kind: 'drill', label: 'GOA User Management', icon: 'key', panel: 'goaUserMgmt' },
      { kind: 'drill', label: 'Licensing', icon: 'shield-checkmark', panel: 'licensing' },
      { kind: 'drill', label: 'Post Verification', icon: 'checkmark-done', panel: 'postVerification' },
      { kind: 'drill', label: 'Program User Management', icon: 'finger-print', panel: 'programUserMgmt' },
      { kind: 'item', label: 'Registered Children Report', icon: 'document-text', url: '#' },
      { kind: 'drill', label: 'Subsidy', icon: 'body', panel: 'subsidy' },
    ],
    childRegistration: [
      { kind: 'item', label: 'Manage children', url: '#' },
      { kind: 'item', label: 'Resolve duplicates', url: '#' },
    ],
    certification: [
      { kind: 'item', label: 'Work Queue', url: '#' },
      { kind: 'item', label: 'My Assignments', url: '#' },
      { kind: 'item', label: 'Search', url: '#' },
      { kind: 'item', label: 'Admin Data', url: '#' },
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
        icon: 'trending-up',
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

  drillInto(panel: string): void {
    this.activePanel = panel;
  }

  backToRoot(): void {
    this.activePanel = 'root';
  }
}
