import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PrototypeLink {
  label: string;
  description: string;
  path: string;
  status?: string;
}

@Component({
  selector: 'platform-prototypes',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './platform-prototypes.component.html',
  styleUrl: './platform-prototypes.component.scss',
})
export class PlatformPrototypesComponent {
  readonly heading = 'Platform prototypes';

  readonly prototypes: PrototypeLink[] = [
    {
      label: 'All notifications page',
      description: 'Full notification history with unread/urgent/all tabs, date grouping, and read state.',
      path: '/notifications',
      status: 'In progress',
    },
    {
      label: 'Notifications — scaling (30 programs)',
      description: 'Four approaches for handling 65+ notifications across 30 programs: by severity, tabs + filter, smart summary, and by program.',
      path: '/notifications-scale',
      status: 'In progress',
    },
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
    {
      label: 'AI Assistant',
      description: 'Help articles with the Sage chat assistant.',
      path: '/help-centre',
    },
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
      label: 'User Access Management',
      description: 'Manage who can access platform programs.',
      path: '/user-access-management',
      status: 'In progress',
    },
  ];
}
