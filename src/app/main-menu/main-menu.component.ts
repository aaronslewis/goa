import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
export class MainMenuComponent {
  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';

  readonly searchItem: MenuItem = { label: 'Search', icon: 'search', url: '#' };

  readonly helpItem: MenuItem = { label: 'Help Centre', icon: 'help-circle', url: '#' };

  readonly entries: MenuEntry[] = [
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
    { kind: 'item', label: 'GOA User Management', icon: 'person', url: '#' },
    { kind: 'item', label: 'Identity and Access Management', icon: 'key', url: '#' },
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
      heading: 'Program User Management',
      icon: 'people',
      items: [
        { label: 'User Access Management', url: '#' },
        { label: 'Legal Representative Management', url: '#' },
        { label: 'Access Request', url: '#' },
        { label: 'Removal Request', url: '#' },
      ],
    },
    { kind: 'item', label: 'Space Creation', icon: 'grid', url: '#' },
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
    {
      kind: 'group',
      heading: 'Wage Top-Up & PD',
      icon: 'trending-up',
      items: [
        { label: 'Programs', url: '#' },
        { label: 'Agreement Management', url: '#' },
      ],
    },
  ];
}
