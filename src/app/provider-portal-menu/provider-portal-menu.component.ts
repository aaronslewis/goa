import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GoabIconType } from '@abgov/ui-components-common';
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabIcon,
} from '@abgov/angular-components';
import { hideWorkSideMenuScrollbarButtons } from '../shared/hide-work-side-menu-scrollbar-buttons';

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
  items: { label: string; url?: string; current?: boolean }[];
}

type MenuEntry = MenuItem | MenuGroup;

@Component({
  selector: 'provider-portal-menu',
  standalone: true,
  imports: [GoabWorkSideMenu, GoabWorkSideMenuGroup, GoabWorkSideMenuItem, GoabIcon],
  templateUrl: './provider-portal-menu.component.html',
  styleUrl: './provider-portal-menu.component.scss',
})
export class ProviderPortalMenuComponent implements AfterViewInit {
  constructor(private router: Router, private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    hideWorkSideMenuScrollbarButtons(this.el.nativeElement);

    // The web component's shadow DOM sets line-height:1 on the profile's
    // secondary text (matching font-size exactly, with overflow:hidden for
    // ellipsis truncation), which clips descenders ('y', 'g', etc.) — this
    // has held across at least two rewrites of the component's internals
    // (the class name below is versioned to the currently-installed
    // @abgov/web-components; re-check this patch on any future bump). Patch
    // it after the element upgrades. goab-work-side-menu is a real Angular
    // component wrapping that same goa-work-side-menu underneath, so this
    // reaches one level deeper than the plain v1 usage did — and, like
    // everything else built on these goab-* wrappers, it gates its own first
    // render behind an async "isReady" flip, so a single immediate +
    // one-retry attempt (which sufficed for v1's near-instant custom element
    // upgrade) isn't reliably enough time here.
    const patch = (): boolean => {
      const shadow = this.el.nativeElement.querySelector('goab-work-side-menu')?.querySelector('goa-work-side-menu')?.shadowRoot;
      if (!shadow) return false;
      if (shadow.querySelector('style[data-patch]')) return true;
      const style = document.createElement('style');
      style.setAttribute('data-patch', '');
      // No Svelte scope-hash class needed — this <style> is appended
      // directly into the same shadow root, so a plain class selector
      // matches; !important is still needed to outrank the library's own
      // higher-specificity rule for the same property.
      style.textContent = '.profile-secondary { line-height: 1.3 !important; }';
      shadow.appendChild(style);
      return true;
    };
    if (!patch()) {
      const observer = new MutationObserver(() => {
        if (patch()) observer.disconnect();
      });
      observer.observe(this.el.nativeElement, { childList: true, subtree: true });
    }
  }

  readonly heading = 'Child Care Licensing Portal';
  readonly userName = 'Sally';
  readonly userSecondaryText = 'sally@abcdaycare.ca';

  readonly helpItem = { label: 'Help Centre - NEW', icon: 'help-circle:outline' as GoabIconType, url: '#' };

  readonly accountMenuItems = [
    { label: 'My profile', icon: 'person-circle:outline' as GoabIconType, action: 'profile' as const },
    { label: 'Sign out', icon: 'log-out:outline' as GoabIconType, action: 'logout' as const },
  ];

  onAccountAction(action: 'profile' | 'logout'): void {
    if (action === 'logout') {
      this.router.navigate(['/']);
    }
  }

  readonly entries: MenuEntry[] = [
    {
      kind: 'group',
      heading: 'Licensing',
      icon: 'shield-checkmark:outline',
      items: [
        { label: 'Dashboard', url: '#' },
        { label: 'Sunny Days Preschool', url: '#' },
        { label: 'Little Learners Academy', url: '#' },
        { label: 'Rainbow Kids Center', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Child Registration',
      icon: 'id-card:outline',
      items: [
        { label: 'Enrollment List', url: '#' },
        { label: 'Pending Registrations', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Claims',
      icon: 'list:outline',
      items: [
        { label: 'Submit Claim', url: '#' },
        { label: 'Submit Adjustment', url: '#' },
        { label: 'Payment Statements', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Funding',
      icon: 'file-tray-full:outline',
      items: [
        { label: 'Affordability Grant', url: '#' },
        { label: 'Family Day Home Agency Contract', url: '#' },
        { label: 'Space Creation', url: '#' },
        { label: 'ECE Workforce Supports Grant', url: '#' },
      ],
    },
    { kind: 'item', label: 'Registered Children Report', icon: 'document-text:outline', url: '#' },
    {
      kind: 'group',
      heading: 'Access',
      icon: 'finger-print:outline',
      items: [{ label: 'User Access Management', url: '#' }],
    },
  ];
}
