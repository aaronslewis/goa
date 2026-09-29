import { AfterViewInit, Component, ElementRef, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
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
}

interface MenuGroup {
  heading: string;
  icon: GoabIconType;
  items: { label: string; url?: string }[];
}

type MenuEntry = ({ kind: 'item' } & MenuItem) | ({ kind: 'group' } & MenuGroup);

type MenuItemElement = HTMLElement & { current?: boolean };

export const HUB_HOME_URL = '#/notifications-hub/home';
export const HUB_NOTIFICATIONS_URL = '#/notifications-hub/notifications';

// Menu content mirrors /menu (MainMenuComponent), plus a pinned Home item.
@Component({
  selector: 'hub-shell',
  host: { class: 'goa-ds-v2' },
  standalone: true,
  imports: [RouterOutlet, GoabWorkSideMenu, GoabWorkSideMenuGroup, GoabWorkSideMenuItem, GoabIcon],
  templateUrl: './hub-shell.component.html',
  styleUrl: './hub-shell.component.scss',
})
export class HubShellComponent implements AfterViewInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);

  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  isMenuOpen = true;

  constructor() {
    effect(() => {
      this.currentUrl();
      this.syncCurrentItem();
    });
  }

  // goa-work-side-menu picks the current item by matching each href's pathname
  // against window.location, and pushes the result to every item via an internal
  // `_update` event. Under hash routing every "#/..." href resolves to pathname
  // "/", so all items tie and it clears `current` on every one. Capturing that
  // event lets us re-apply the router's answer right after the menu's pass.
  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    hideWorkSideMenuScrollbarButtons(host);
    host.addEventListener(
      '_update',
      (e) => {
        const item = e.target as MenuItemElement;
        if (item.tagName === 'GOA-WORK-SIDE-MENU-ITEM') queueMicrotask(() => this.applyCurrent(item));
      },
      true,
    );
    this.syncCurrentItem();
  }

  private syncCurrentItem(): void {
    const host = this.el.nativeElement as HTMLElement;
    host.querySelectorAll<MenuItemElement>('goa-work-side-menu-item').forEach((item) => this.applyCurrent(item));
  }

  private applyCurrent(item: MenuItemElement): void {
    const current = this.isCurrent(item.getAttribute('url') ?? undefined);
    if (item.current !== current) item.current = current;
  }

  // GoabWorkSideMenu's (onToggle) emits void, not an open/closed payload.
  onMenuToggle(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // The menu cancels the anchor's default navigation and emits the href instead.
  // Placeholder items ("#") stay put; real routes go through the router.
  onNavigate(url: string): void {
    if (url.startsWith('#/')) this.router.navigateByUrl(url.slice(1));
    else queueMicrotask(() => this.syncCurrentItem());
  }

  isCurrent(url?: string): boolean {
    return !!url && url.startsWith('#/') && this.currentUrl().startsWith(url.slice(1));
  }

  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';

  readonly homeItem: MenuItem = { label: 'Home', icon: 'grid:outline', url: HUB_HOME_URL };
  readonly searchItem: MenuItem = { label: 'Search', icon: 'search:outline', url: '#' };
  readonly helpItem: MenuItem = { label: 'Help Centre', icon: 'help-circle:outline', url: '#' };
  readonly notificationsItem: MenuItem = {
    label: 'Notifications',
    icon: 'notifications:outline',
    url: HUB_NOTIFICATIONS_URL,
  };

  readonly accountMenuItems = [
    { label: 'My Profile', icon: 'person-circle:outline' as GoabIconType },
    { label: 'Log out', icon: 'log-out:outline' as GoabIconType },
  ];

  readonly entries: MenuEntry[] = [
    {
      kind: 'group',
      heading: 'Administrative Penalties',
      icon: 'ticket:outline',
      items: [{ label: 'Penalties', url: '#' }, { label: 'Reports', url: '#' }],
    },
    {
      kind: 'group',
      heading: 'Affordability Grant',
      icon: 'pie-chart:outline',
      items: [{ label: 'Programs', url: '#' }, { label: 'Agreement Management', url: '#' }],
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
      items: [{ label: 'Programs', url: '#' }, { label: 'Agreement Management', url: '#' }],
    },
    {
      kind: 'group',
      heading: 'Family Day Home Agency Contract',
      icon: 'home:outline',
      items: [{ label: 'Programs', url: '#' }, { label: 'Contract Management', url: '#' }],
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
        { label: 'Child Care Program Search', url: '#' },
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
}
