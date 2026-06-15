import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface MenuLeaf {
  label: string;
  url?: string;
  current?: boolean;
}

interface MenuItem {
  kind: 'item';
  label: string;
  icon: string;
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
  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';

  readonly searchItem: MenuItem = { kind: 'item', label: 'Search', icon: 'search', url: '#' };

  readonly helpItem = { label: 'Help Centre', icon: 'help-circle', url: '#' };

  readonly accountMenuItems = [
    { label: 'Settings', icon: 'settings', action: 'settings' as const },
    { label: 'Log out', icon: 'log-out', action: 'logout' as const },
  ];

  onAccountAction(action: 'settings' | 'logout'): void {
    // Hook into router/auth when those exist; no-op for now.
  }

  // Which panel is showing: 'root' or a drill-in panel key.
  activePanel = 'root';

  private readonly panelTitles: Record<string, string> = { funding: 'Funding' };

  // Original IA, with the requested regrouping applied:
  // - Funding is a drill-in panel (third layer) holding the funding programs.
  // - GOA User Management groups the two access pages.
  // - Payment Statements moved under Claims.
  private readonly panels: Record<string, MenuEntry[]> = {
    root: [
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
      { kind: 'item', label: 'Child Registration', icon: 'create', url: '#' },
      {
        kind: 'group',
        heading: 'Claims',
        icon: 'list',
        items: [
          { label: 'Assess Claims', url: '#' },
          { label: 'Assess Adjustments', url: '#' },
          { label: 'Submit Adjustments', url: '#' },
          { label: 'Payment Statements', url: '#' },
        ],
      },
      { kind: 'drill', label: 'Funding', icon: 'wallet', panel: 'funding' },
      {
        kind: 'group',
        heading: 'GOA User Management',
        icon: 'person',
        items: [
          { label: 'GOA User Management', url: '#' },
          { label: 'Identity and Access Management', url: '#' },
        ],
      },
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
      {
        kind: 'group',
        heading: 'Program User Management',
        icon: 'people',
        items: [
          { label: 'User Access Management', url: '#' },
          { label: 'Legal Representative Management', url: '#' },
          { label: 'Access Request', url: '#' },
          { label: 'Removal Request', url: '#' },
        ],
      },
      { kind: 'item', label: 'Subsidized Children Report', icon: 'bar-chart', url: '#' },
      {
        kind: 'group',
        heading: 'Subsidy',
        icon: 'cash',
        items: [
          { label: 'Work Queue', url: '#', current: true },
          { label: 'My Assignments', url: '#' },
          { label: 'Subsidy Application Form', url: '#' },
        ],
      },
    ],
    funding: [
      {
        kind: 'group',
        heading: 'Affordability Grant',
        icon: 'albums',
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
      { kind: 'item', label: 'Space Creation', icon: 'grid', url: '#' },
      {
        kind: 'group',
        heading: 'Wage Top-Up & PD',
        icon: 'trending-up',
        items: [
          { label: 'Programs', url: '#' },
          { label: 'Agreement Management', url: '#' },
        ],
      },
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
