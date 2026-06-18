import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';


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
  items: { label: string; url?: string; current?: boolean }[];
}

type MenuEntry = MenuItem | MenuGroup;

@Component({
  selector: 'provider-portal-menu',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './provider-portal-menu.component.html',
  styleUrl: './provider-portal-menu.component.scss',
})
export class ProviderPortalMenuComponent implements AfterViewInit {
  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    // The web component's shadow DOM sets line-height: 12px on the email text,
    // which clips descenders ('y', 'g', etc.). Patch it after the element upgrades.
    const patch = () => {
      const menu = document.querySelector('goa-work-side-menu');
      const shadow = menu?.shadowRoot;
      if (!shadow) return;
      const existing = shadow.querySelector('style[data-patch]');
      if (existing) return;
      const style = document.createElement('style');
      style.setAttribute('data-patch', '');
      style.textContent = '.profile.svelte-i9l4k4 { padding-bottom: 16px !important; }';
      shadow.appendChild(style);
    };
    // Try immediately, then retry after the custom element upgrades
    patch();
    setTimeout(patch, 100);
  }
  readonly heading = 'Child Care Licensing Portal';
  readonly userName = 'Sally';
  readonly userSecondaryText = 'sally@abcdaycare.ca';

  readonly helpItem = { label: 'Help Centre - NEW', icon: 'help-circle', url: '#' };

  readonly accountMenuItems = [
    { label: 'My profile', icon: 'person-circle', action: 'profile' as const },
    { label: 'Sign out', icon: 'log-out', action: 'logout' as const },
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
      icon: 'shield-checkmark',
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
      icon: 'id-card',
      items: [
        { label: 'Enrollment List', url: '#' },
        { label: 'Pending Registrations', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Claims',
      icon: 'list',
      items: [
        { label: 'Submit Claim', url: '#' },
        { label: 'Submit Adjustment', url: '#' },
        { label: 'Payment Statements', url: '#' },
      ],
    },
    {
      kind: 'group',
      heading: 'Funding',
      icon: 'file-tray-full',
      items: [
        { label: 'Affordability Grant', url: '#' },
        { label: 'Family Day Home Agency Contract', url: '#' },
        { label: 'Space Creation', url: '#' },
        { label: 'ECE Workforce Supports Grant', url: '#' },
      ],
    },
    { kind: 'item', label: 'Registered Children Report', icon: 'document-text', url: '#' },
    {
      kind: 'group',
      heading: 'Access',
      icon: 'finger-print',
      items: [{ label: 'User Access Management', url: '#' }],
    },
  ];
}
