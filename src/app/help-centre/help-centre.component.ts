import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, signal } from '@angular/core';
import { HelpCentreFeedbackComponent } from './help-centre-feedback/help-centre-feedback.component';

interface GuideLink {
  label: string;
  href: string;
}

interface Guide {
  icon: string;
  title: string;
  body: string;
  links: GuideLink[];
}

@Component({
  selector: 'help-centre',
  standalone: true,
  imports: [HelpCentreFeedbackComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './help-centre.component.html',
  styleUrl: './help-centre.component.scss',
})
export class HelpCentreComponent {
  /** Fired by the hidden "Help Centre - NEW" menu item to replay the Sage
   *  widget as a returning-user experience. */
  @Output() returningUserTrigger = new EventEmitter<void>();

  readonly userMenuOpen = signal(false);

  readonly navSections = [
    { label: 'My Programs', kind: 'item' as const, href: '#' },
    { label: 'Licensing', kind: 'group' as const, href: '#' },
    { label: 'Child Registration', kind: 'item' as const, href: '#' },
    { label: 'Claims', kind: 'group' as const, href: '#' },
    { label: 'Funding', kind: 'group' as const, href: '#' },
    {
      label: 'Access',
      kind: 'group' as const,
      href: '#',
      expanded: true,
      children: [
        { label: 'User Access Management', href: '#', active: false },
        { label: 'Help Centre - NEW', href: '#', active: true, trigger: true },
      ],
    },
  ];

  readonly guides: Guide[] = [
    {
      icon: 'person',
      title: 'Account and Service Guide',
      body: 'Learn how to create account and get access to services.',
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'medical',
      title: 'Affordability Grant Agreements',
      body: 'Learn how to sign the Affordability Grant, which provides funding to licensed child care programs to reduce parent fees.',
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'create',
      title: 'Child Registration',
      body: "Learn how to register new children and manage your program's registration list.",
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'card',
      title: 'Claim Adjustments',
      body: 'Learn how to submit claims adjustments for Grant funding, Wage Top-up, Subsidy, and Inclusive Child Care payments.',
      links: [
        { label: 'Open guide', href: '#' },
        { label: 'Additional guide for family day home agencies', href: '#' },
      ],
    },
    {
      icon: 'list',
      title: 'Claims Submission',
      body: 'Learn how to submit claims for Grant funding, Wage Top-ups, Subsidy and Inclusive Child Care payments.',
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'document-text',
      title: 'Family Day Home Agency Contracts',
      body: 'Learn how to sign Family Day Home Agency contracts which provide funding to facilitate the operation and administration of Family Day Home programs.',
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'ribbon',
      title: 'Licensing',
      body: 'Learn how to manage program licensing information, including contact information, staff profiles and document uploads.',
      links: [
        { label: 'Open guide - facility-based version', href: '#' },
        { label: 'Open guide - family day home agency version', href: '#' },
      ],
    },
    {
      icon: 'settings',
      title: 'New Super Admin Account Set up Guide',
      body: 'Learn how new program license holder legal representatives are invited to create their Child Care Licensing Portal account to become a Super Admin.',
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'receipt',
      title: 'Payment Statements',
      body: 'Learn how to download detailed statements of claim payments, adjustments, and recoveries for financial management.',
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'clipboard',
      title: 'Subsidized Children Report',
      body: 'Learn how to view a real time report for all children with an approved subsidy agreement in the program.',
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'people',
      title: 'User Access Management',
      body: "Learn how to manage access for your program's portal users by inviting users and giving or removing access to various services.",
      links: [{ label: 'Open guide', href: '#' }],
    },
    {
      icon: 'business',
      title: 'Early Childhood Educator Workforce Supports Grant agreement',
      body: 'Learn how to sign the grant agreement that provides licensed child care programs with wage top-up, mandatory employer contribution, professional development and release time grants for eligible certified early childhood educators.',
      links: [{ label: 'Open guide', href: '#' }],
    },
  ];

  get guideTitles(): string[] {
    return this.guides.map((g) => g.title);
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update(v => !v);
  }

  onNavChildClick(event: Event, child: { trigger?: boolean }): void {
    if (child.trigger) {
      event.preventDefault();
      this.returningUserTrigger.emit();
    }
  }
}
