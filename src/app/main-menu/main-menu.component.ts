import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { GoabIconType } from '@abgov/ui-components-common';
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabIcon,
} from '@abgov/angular-components';
import { hideWorkSideMenuScrollbarButtons } from '../shared/hide-work-side-menu-scrollbar-buttons';

interface MenuItem {
  label: string;
  icon: GoabIconType;
  url?: string;
  current?: boolean;
}

interface MenuGroup {
  heading: string;
  icon: GoabIconType;
  items: { label: string; url?: string; current?: boolean }[];
}

type MenuEntry = ({ kind: 'item' } & MenuItem) | ({ kind: 'group' } & MenuGroup);

@Component({
  selector: 'main-menu',
  standalone: true,
  imports: [GoabWorkSideMenu, GoabWorkSideMenuGroup, GoabWorkSideMenuItem, GoabIcon],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    hideWorkSideMenuScrollbarButtons(this.el.nativeElement);
  }

  isMenuOpen = true;

  // GoabWorkSideMenu's (onToggle) emits void, not an open/closed payload, so
  // this is the source of truth for whether the menu is expanded.
  onMenuToggle(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';

  readonly searchItem: MenuItem = { label: 'Search', icon: 'search:outline', url: '#' };

  readonly helpItem: MenuItem = { label: 'Help Centre', icon: 'help-circle:outline', url: '#' };

  readonly notificationsItem: MenuItem = { label: 'Notifications', icon: 'notifications:outline', url: '/notifications' };

  readonly accountMenuItems = [
    { label: 'My Profile', icon: 'person-circle:outline' as GoabIconType, action: 'profile' as const },
    { label: 'Log out', icon: 'log-out:outline' as GoabIconType, action: 'logout' as const },
  ];

  onAccountAction(action: 'profile' | 'logout'): void {
    // Hook into router/auth when those exist; no-op for now.
  }

  readonly entries: MenuEntry[] = [
    {
      kind: 'group',
      heading: 'Administrative Penalties',
      icon: 'ticket:outline',
      items: [
        { label: 'Penalties', url: '#' },
        { label: 'Reports', url: '#' },
      ],
    },
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
      heading: 'Certification',
      icon: 'ribbon:outline',
      items: [
        { label: 'Admin Data', url: '#' },
        { label: 'My Assignments', url: '#' },
        { label: 'Search', url: '#' },
        { label: 'Work Queue', url: '#' },
      ],
    },
    { kind: 'item', label: 'Child Registration', icon: 'id-card:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Claims',
      icon: 'list:outline',
      items: [
        { label: 'Assess Adjustments', url: '#' },
        { label: 'Assess Claims', url: '#' },
        { label: 'Submit Adjustments', url: '#' },
      ],
    },
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
    { kind: 'item', label: 'Family Portal', icon: 'people:outline', url: '#' },
    { kind: 'item', label: 'GOA User Management', icon: 'key:outline', url: '#' },
    { kind: 'item', label: 'Identity and Access Management', icon: 'lock-closed:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Licensing',
      icon: 'shield-checkmark:outline',
      items: [
        { label: 'Admin Data', url: '#' },
        { label: 'Child Care Program Search', url: '#' },
        { label: 'Dashboard', url: '#' },
        { label: 'People Search', url: '#' },
        { label: 'Program Educator Search', url: '#' },
      ],
    },
    { kind: 'item', label: 'Payment Statements', icon: 'receipt:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Post Verification',
      icon: 'checkmark-done:outline',
      items: [
        { label: '30 Day Letter', url: '#' },
        { label: 'Completed', url: '#' },
        { label: 'RoR - Debt Recovery Team', url: '#' },
        { label: 'RoR - File Closure', url: '#' },
        { label: 'Suspension Letter', url: '#' },
        { label: 'Warning Letter', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Program User Management',
      icon: 'finger-print:outline',
      items: [
        { label: 'Access Request', url: '#' },
        { label: 'Legal Representative Management', url: '#' },
        { label: 'Removal Request', url: '#' },
        { label: 'User Access Management', url: '#' },
      ],
    },
    { kind: 'item', label: 'Registered Children Report', icon: 'document-text:outline', url: '#' },
    { kind: 'item', label: 'Space Creation', icon: 'expand:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Subsidy',
      icon: 'body:outline',
      items: [
        { label: 'My Assignments', url: '#' },
        { label: 'Subsidy Application Form', url: '#' },
        { label: 'Work Queue', url: '#', current: true },
      ],
    },
  ];
}
