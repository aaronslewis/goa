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
      label: 'AI Assistant',
      description: 'Help articles with the Sage chat assistant.',
      path: '/help-centre',
    },
    {
      label: 'Workspace menu',
      description: 'Workspace side navigation for the Early Childhood Development System.',
      path: '/menu',
    },
    {
      label: 'Workspace menu (variation)',
      description: 'Side navigation with a Funding drill-down panel.',
      path: '/menu-2',
    },
    {
      label: 'Check your eligibility',
      description: 'Short form that estimates child care subsidy eligibility.',
      path: '/eligibility-check',
    },
    {
      label: 'User Access Management',
      description: 'Manage who can access platform programs.',
      path: '/user-access-management',
      status: 'In progress',
    },
  ];
}
