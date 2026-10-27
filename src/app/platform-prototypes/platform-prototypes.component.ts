import { Component } from '@angular/core';
import { GoabBadge } from '@abgov/angular-components';
import { RouterLink } from '@angular/router';

interface PrototypeLink {
  label: string;
  description: string;
  path: string;
  status?: string;
  // Variants of this prototype, listed as an indented subsection under its card.
  scenarios?: { heading: string; items: PrototypeLink[] };
}

interface PrototypeGroup {
  heading: string;
  items: PrototypeLink[];
}

@Component({
  selector: 'platform-prototypes',
  host: { class: 'goa-ds-v2' },
  standalone: true,
  imports: [RouterLink, GoabBadge],
  templateUrl: './platform-prototypes.component.html',
  styleUrl: './platform-prototypes.component.scss',
})
export class PlatformPrototypesComponent {
  readonly heading = 'Platform prototypes';

  readonly groups: PrototypeGroup[] = [
    {
      heading: 'Acknowledgement',
      items: [
        {
          label: 'Portal access acknowledgement — DS v2',
          description:
            'Revised Child Care Accountability Program acknowledgement: declaration, verification, terms and confirmation, using the task list page pattern.',
          path: '/acknowledgement',
          status: 'In progress',
        },
        {
          label: 'Portal access acknowledgement v2 — DS v2',
          description:
            'Revised acknowledgement with all three steps in one task list section. A Start button opens each step, and Next moves straight to the following one.',
          path: '/acknowledgement-v2',
          status: 'In progress',
          scenarios: {
            heading: 'Multi-organization scenarios',
            items: [
              {
                label: 'Portal access acknowledgement — multiple organizations, grace period ended',
                description:
                  'For providers who sign for several organizations and are past the ~3-month grace period: they acknowledge every organization, one at a time, before they can use the portal. Acknowledged organizations show a checkmark in the dropdown.',
                path: '/acknowledgement-multi-org',
                status: 'In progress',
              },
            ],
          },
        },
      ],
    },
    {
      heading: 'Notifications',
      items: [
        {
          label: 'Notifications hub — DS v2',
          description:
            'Home page with last-30-day notifications, plus a full Notifications page filtered by program, severity, status, and date range.',
          path: '/notifications-hub',
          status: 'In progress',
        },
        {
          label: 'Notifications hub with panel — DS v2',
          description:
            'The same hub, but Notifications in the side menu opens a notifications panel beside the menu, with a link through to the full page.',
          path: '/notifications-hub-panel',
          status: 'In progress',
        },
        {
          label: 'Notifications hub with panel, mark read on click — DS v2',
          description:
            'The panel version, where clicking a notification turns it grey to show it as read. It can still be dismissed.',
          path: '/notifications-hub-read',
          status: 'In progress',
        },
        {
          label: 'Notifications hub v3 — DS v2',
          description:
            'Home is a full-page notification centre: each notification is a card with a status-coloured strip, a type icon and an action button.',
          path: '/notifications-hub-v3',
          status: 'In progress',
        },
        {
          label: 'Notifications hub v3 with panel — DS v2',
          description:
            'The v3 notification cards in a panel that opens from Notifications in the side menu, instead of on Home.',
          path: '/notifications-hub-v3-panel',
          status: 'In progress',
        },
        {
          label: 'Notification centre — click-through demo',
          description:
            'Home opens with three notifications; a new critical one arrives after a few seconds. Filter to Critical, complete one, then view all notifications.',
          path: '/notifications-hub-demo',
          status: 'In progress',
        },
        {
          label: 'Notification centre — click-through demo with panel',
          description:
            'The click-through demo with notifications in a panel from the side menu. A new critical one arrives after a few seconds; open Notifications, filter to Critical, complete one, then view all.',
          path: '/notifications-hub-demo-panel',
          status: 'In progress',
        },
      ],
    },
    {
      heading: 'Menu',
      items: [
        {
          label: 'Workspace menu (original)',
          description: 'Workspace side navigation for the Early Childhood Development System.',
          path: '/menu',
        },
        {
          label: 'Workspace menu (updated)',
          description: 'ECDS side navigation with service drill downs.',
          path: '/menu-2',
        },
        {
          label: 'Workspace menu (child icons)',
          description: 'ECDS side navigation — collapsed Certification panel shows abstract child icons.',
          path: '/menu-3',
        },
        {
          label: 'Provider portal menu',
          description: 'Provider side navigation menu without drill-down behavior.',
          path: '/provider-portal-menu',
        },
        {
          label: 'Provider portal notifications',
          description:
            'The provider portal menu with a Notifications page for child care providers: grants to sign, claims, incident reports, access changes and child registration events.',
          path: '/provider-portal-notifications',
          status: 'In progress',
        },
        {
          label: 'Family portal notifications',
          description:
            'The same menu with My profile and Children, and a Notifications page for parents: registrations to confirm, funding and subsidy updates, profile changes and program news.',
          path: '/family-portal-notifications',
          status: 'In progress',
        },
      ],
    },
    {
      heading: 'Homepage',
      items: [
        {
          label: 'ECDS dashboard — DS v2',
          description: 'ECDS dashboard rebuilt with Design System v2 components (GoabWorkSideMenu, GoabCallout, GoabContainer).',
          path: '/ecds-dashboard-v2',
          status: 'In progress',
        },
        {
          label: 'Staff dashboard (generic)',
          description: 'Role-adaptive home page with to-dos, recent activity, and assignments across child care services.',
          path: '/generic-dashboard',
          status: 'In progress',
        },
        {
          label: 'ECDS dashboard home',
          description: 'Staff dashboard with left nav, notifications, and what\'s new panel.',
          path: '/ecds-dashboard',
          status: 'In progress',
        },
        {
          label: 'Home page redesign',
          description: 'My Programs landing page redesign.',
          path: '/home-page-design',
        },
      ],
    },
    {
      heading: 'AI Assistant',
      items: [
        {
          label: 'AI Assistant',
          description: 'Help articles with the Sage chat assistant.',
          path: '/help-centre',
        },
      ],
    },
    {
      heading: 'User Access Management',
      items: [
        {
          label: 'User Access Management',
          description: 'Manage who can access platform programs.',
          path: '/user-access-management',
          status: 'In progress',
        },
      ],
    },
  ];
}
