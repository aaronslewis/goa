import { AfterViewInit, Component, ElementRef, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { GoabIconType } from '@abgov/ui-components-common';
import {
  GoabIcon,
  GoabTemporaryNotificationCtrl,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
} from '@abgov/angular-components';
import { hideWorkSideMenuScrollbarButtons } from '../shared/hide-work-side-menu-scrollbar-buttons';

type MenuItemElement = HTMLElement & { current?: boolean };

const BASE = '/family-portal-notifications';

// The same side menu as the provider portal prototype, with the family portal's
// two items. Only Notifications is a real page; My profile, Children and Help
// are placeholders.
@Component({
  selector: 'family-portal-notifications-shell',
  host: { class: 'goa-ds-v2' },
  standalone: true,
  imports: [
    RouterOutlet,
    GoabIcon,
    GoabTemporaryNotificationCtrl,
    GoabWorkSideMenu,
    GoabWorkSideMenuItem,
    GoabWorkspaceLayout,
  ],
  templateUrl: './family-portal-notifications-shell.component.html',
  styleUrl: './family-portal-notifications-shell.component.scss',
})
export class FamilyPortalNotificationsShellComponent implements AfterViewInit {
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
    this.patchProfileLineHeight();
    this.syncCurrentItem();
  }

  // The menu's profile secondary text clips descenders (line-height equals
  // font-size with overflow hidden); same patch as ProviderPortalMenuComponent.
  // Re-check on any @abgov/web-components bump.
  private patchProfileLineHeight(): void {
    const host = this.el.nativeElement as HTMLElement;
    const patch = (): boolean => {
      const shadow = host.querySelector('goab-work-side-menu')?.querySelector('goa-work-side-menu')?.shadowRoot;
      if (!shadow) return false;
      if (shadow.querySelector('style[data-patch]')) return true;
      const style = document.createElement('style');
      style.setAttribute('data-patch', '');
      style.textContent = '.profile-secondary { line-height: 1.3 !important; }';
      shadow.appendChild(style);
      return true;
    };
    if (patch()) return;
    const observer = new MutationObserver(() => {
      if (patch()) observer.disconnect();
    });
    observer.observe(host, { childList: true, subtree: true });
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

  onAccountAction(action: 'logout'): void {
    if (action === 'logout') this.router.navigate(['/']);
  }

  readonly heading = 'Family Portal';
  readonly userName = 'Jasmine';
  readonly userSecondaryText = 'jasmine.okafor@example.ca';

  readonly primaryItems = [
    { label: 'My profile', icon: 'person-circle:outline' as GoabIconType, url: '#' },
    { label: 'Children', icon: 'people:outline' as GoabIconType, url: '#' },
  ];
  readonly helpItem = { label: 'Help Centre', icon: 'help-circle:outline' as GoabIconType, url: '#' };
  readonly notificationsItem = {
    label: 'Notifications',
    icon: 'notifications:outline' as GoabIconType,
    url: `#${BASE}/notifications`,
  };

  readonly accountMenuItems = [
    { label: 'Sign out', icon: 'log-out:outline' as GoabIconType, action: 'logout' as const },
  ];
}
