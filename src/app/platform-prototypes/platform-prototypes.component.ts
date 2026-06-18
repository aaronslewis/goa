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
