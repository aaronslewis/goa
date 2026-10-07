import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GoabIconType, GoabInputOnChangeDetail, GoabInputOnKeyPressDetail } from '@abgov/ui-components-common';
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabFormItem,
  GoabInput,
  GoabIcon,
} from '@abgov/angular-components';
import { hideWorkSideMenuScrollbarButtons } from '../../../shared/hide-work-side-menu-scrollbar-buttons';
import { OrgResult, ProgramResult, UserResult, searchOrganizations, searchPrograms, searchUsers } from '../search-data';

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

const MAX_PREVIEW = 2;

@Component({
  selector: 'app-search-shell',
  standalone: true,
  imports: [
    GoabWorkSideMenu,
    GoabWorkSideMenuGroup,
    GoabWorkSideMenuItem,
    GoabFormItem,
    GoabInput,
    GoabIcon,
  ],
  templateUrl: './search-shell.component.html',
  styleUrl: './search-shell.component.scss',
})
export class SearchShellComponent implements OnInit, AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>, private router: Router) {}

  ngAfterViewInit(): void {
    hideWorkSideMenuScrollbarButtons(this.el.nativeElement);
  }

  @Input() initialQuery = '';
  @Output() queryChange = new EventEmitter<string>();

  // ── Left navigation — copied from the original workspace menu ──────────────

  isMenuOpen = true;

  onMenuToggle(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Nancy Trustworthy';
  readonly userSecondaryText = 'nancy.trustworthy@gov.ab.ca';

  readonly searchItem: MenuItem = { label: 'Search', icon: 'search:outline', url: '/search-service' };
  readonly helpItem: MenuItem = { label: 'Help Centre', icon: 'help-circle:outline', url: '#' };
  readonly notificationsItem: MenuItem = { label: 'Notifications', icon: 'notifications:outline', url: '/notifications' };

  readonly accountMenuItems = [
    { label: 'My Profile', icon: 'person-circle:outline' as GoabIconType, action: 'profile' as const },
    { label: 'Log out', icon: 'log-out:outline' as GoabIconType, action: 'logout' as const },
  ];

  onAccountAction(_action: 'profile' | 'logout'): void {
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
        { label: 'Programs', url: '#' },
        { label: 'Agreement Management', url: '#' },
      ],
    },
    { kind: 'item', label: 'Affordability Grant Financial Reporting', icon: 'bar-chart:outline', url: '#' },
    { kind: 'item', label: 'Agreement Configuration', icon: 'documents:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Certification',
      icon: 'ribbon:outline',
      items: [
        { label: 'Work Queue', url: '#' },
        { label: 'My Assignments', url: '#' },
        { label: 'Search', url: '#' },
        { label: 'Admin Data', url: '#' },
      ],
    },
    { kind: 'item', label: 'Child Registration', icon: 'id-card:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Claims',
      icon: 'list:outline',
      items: [
        { label: 'Assess Claims', url: '#' },
        { label: 'Assess Adjustments', url: '#' },
        { label: 'Submit Adjustments', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'ECE Workforce Supports',
      icon: 'server:outline',
      items: [
        { label: 'Programs', url: '#' },
        { label: 'Agreement Management', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Family Day Home Agency Contract',
      icon: 'home:outline',
      items: [
        { label: 'Programs', url: '#' },
        { label: 'Contract Management', url: '#' },
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
        { label: 'Dashboard', url: '#' },
        { label: 'Child Care Program Search', url: '/search-service', current: true },
        { label: 'Program Educator Search', url: '#' },
        { label: 'People Search', url: '#' },
        { label: 'Admin Data', url: '#' },
      ],
    },
    { kind: 'item', label: 'Payment Statements', icon: 'receipt:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Post Verification',
      icon: 'checkmark-done:outline',
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
      icon: 'finger-print:outline',
      items: [
        { label: 'User Access Management', url: '#' },
        { label: 'Legal Representative Management', url: '#' },
        { label: 'Access Request', url: '#' },
        { label: 'Removal Request', url: '#' },
      ],
    },
    { kind: 'item', label: 'Registered Children Report', icon: 'document-text:outline', url: '#' },
    { kind: 'item', label: 'Space Creation', icon: 'expand:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Subsidy',
      icon: 'body:outline',
      items: [
        { label: 'Work Queue', url: '#' },
        { label: 'My Assignments', url: '#' },
        { label: 'Subsidy Application Form', url: '#' },
      ],
    },
  ];

  // ── Search + typeahead dropdown ─────────────────────────────────────────────

  query = '';
  dropdownOpen = false;

  ngOnInit(): void {
    this.query = this.initialQuery;
  }

  get orgResults(): OrgResult[] {
    return searchOrganizations(this.query);
  }

  get programResults(): ProgramResult[] {
    return searchPrograms(this.query);
  }

  get userResults(): UserResult[] {
    return searchUsers(this.query);
  }

  get orgPreview(): OrgResult[] {
    return this.orgResults.slice(0, MAX_PREVIEW);
  }

  get programPreview(): ProgramResult[] {
    return this.programResults.slice(0, MAX_PREVIEW);
  }

  get userPreview(): UserResult[] {
    return this.userResults.slice(0, MAX_PREVIEW);
  }

  get hasResults(): boolean {
    return this.orgResults.length > 0 || this.programResults.length > 0 || this.userResults.length > 0;
  }

  onSearchChange(detail: GoabInputOnChangeDetail): void {
    this.query = detail.value;
    this.queryChange.emit(this.query);
    this.dropdownOpen = this.query.trim().length > 0;
  }

  onSearchFocus(): void {
    if (this.query.trim().length > 0) this.dropdownOpen = true;
  }

  onSearchBlur(): void {
    // Delay so a click on a dropdown item registers before the panel closes.
    setTimeout(() => (this.dropdownOpen = false), 150);
  }

  goToOrganization(org: OrgResult): void {
    this.dropdownOpen = false;
    this.router.navigate(['/search-service/organization-details'], { queryParams: { id: org.id } });
  }

  goToProgram(program: ProgramResult): void {
    this.dropdownOpen = false;
    this.router.navigate(['/search-service/program-details'], { queryParams: { id: program.id } });
  }

  goToUser(user: UserResult): void {
    this.dropdownOpen = false;
    this.router.navigate(['/search-service/user-profile'], { queryParams: { id: user.id } });
  }

  showAllOrganizations(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/search-service/results', 'organizations'], { queryParams: { q: this.query } });
  }

  showAllPrograms(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/search-service/results', 'programs'], { queryParams: { q: this.query } });
  }

  showAllUsers(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/search-service/results', 'users'], { queryParams: { q: this.query } });
  }

  clearSearch(): void {
    this.query = '';
    this.dropdownOpen = false;
    this.queryChange.emit(this.query);
  }

  onSearchKeyPress(detail: GoabInputOnKeyPressDetail): void {
    if (detail.key !== 'Enter' || !this.query.trim()) return;
    if (this.orgResults.length) this.showAllOrganizations();
    else if (this.programResults.length) this.showAllPrograms();
    else if (this.userResults.length) this.showAllUsers();
  }
}
