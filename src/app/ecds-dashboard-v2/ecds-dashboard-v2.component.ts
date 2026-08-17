import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabContainer,
  GoabBadge,
  GoabIcon,
  GoabButton,
  GoabCallout,
  GoabIconButton,
} from '@abgov/angular-components';

export interface NotificationV2 {
  id: string;
  calloutType: 'emergency' | 'important' | 'information';
  title: string;
  description: string;
  dismissed?: boolean;
}

@Component({
  selector: 'ecds-dashboard-v2',
  standalone: true,
  imports: [
    DatePipe,
    GoabWorkSideMenu,
    GoabWorkSideMenuItem,
    GoabContainer,
    GoabBadge,
    GoabIcon,
    GoabButton,
    GoabCallout,
    GoabIconButton,
  ],
  templateUrl: './ecds-dashboard-v2.component.html',
  styleUrl: './ecds-dashboard-v2.component.scss',
})
export class EcdsDashboardV2Component {
  readonly heading = 'Early Childhood Development System';
  readonly userName = 'Edna Mode';
  readonly userSecondaryText = 'edna.mode@gov.ab.ca';
  readonly today = new Date();

  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  readonly firstName = 'Edna';

  isMenuOpen = true;

  onMenuToggle(event: { open: boolean }): void {
    this.isMenuOpen = event.open;
  }

  // ── Stat tiles ────────────────────────────────────────────────────────────

  readonly stats = [
    { label: 'Incident reports raised', count: 3, type: 'error' as const, period: 'Past 30 days' },
    { label: 'Non-compliance cases raised', count: 8, type: 'important' as const, period: 'Past 30 days' },
    { label: 'Inspections completed', count: 5, type: 'success' as const, period: 'Past 30 days' },
    { label: 'Licences reviewed', count: 12, type: 'info' as const, period: 'Past 30 days' },
  ];

  // ── Notifications ─────────────────────────────────────────────────────────

  notifications: NotificationV2[] = [
    {
      id: 'n1',
      calloutType: 'emergency',
      title: 'Calamari Kindergarden\'s licence will expire on Oct 12, 2026',
      description: 'Immediate action is required before the expiry date.',
    },
    {
      id: 'n2',
      calloutType: 'important',
      title: 'Critical incident report submitted for Tiramisu Daycare',
      description: 'A new critical incident report has been submitted and requires your attention.',
    },
    {
      id: 'n3',
      calloutType: 'important',
      title: 'Dunder Mifflin Family Day Homes updated a non-compliance for review',
      description: 'A non-compliance record has been updated and requires your review.',
    },
    {
      id: 'n4',
      calloutType: 'important',
      title: 'Scott\'s Tots has 1 unresolved non-compliance',
      description: 'Action required before May 20, 2026.',
    },
    {
      id: 'n5',
      calloutType: 'information',
      title: 'MSPC Daycare inspection needs to be completed',
      description: 'You have 1 draft inspection to complete for MSPC Daycare.',
    },
    {
      id: 'n6',
      calloutType: 'information',
      title: 'Tiramisu Daycare insurance documentation expiring in a month',
      description: 'Insurance documentation for Tiramisu Daycare will expire on September 12, 2026.',
    },
    {
      id: 'n7',
      calloutType: 'information',
      title: 'Scott\'s Tots uploaded a new document',
      description: 'Complaint Form was uploaded by Scott\'s Tots on July 14, 2026.',
    },
  ];

  get activeNotifications(): NotificationV2[] {
    return this.notifications.filter(n => !n.dismissed);
  }

  get notificationCount(): number {
    return this.activeNotifications.length;
  }

  dismiss(id: string): void {
    const n = this.notifications.find(x => x.id === id);
    if (n) n.dismissed = true;
  }

  // ── My caseload ───────────────────────────────────────────────────────────

  readonly caseload = [
    { name: 'Calamari Kindergarden', url: '#' },
    { name: 'Tiramisu Daycare', url: '#' },
    { name: 'MSPC Daycare', url: '#' },
    { name: 'Scott\'s Tots', url: '#' },
    { name: 'Dunder Mifflin Family Day Homes', url: '#' },
    { name: 'Rainbow Bridge Child Care', url: '#' },
    { name: 'Sunflower Learning Centre', url: '#' },
    { name: 'Little Explorers Daycare', url: '#' },
    { name: 'Maple Grove Child Care', url: '#' },
    { name: 'Bright Beginnings Preschool', url: '#' },
  ];

  // ── What's new ────────────────────────────────────────────────────────────

  readonly whatsNew = [
    {
      version: '3.4',
      date: new Date('2026-06-20'),
      service: 'Certification',
      heading: 'Batch assignment for work queue items',
      summary: 'Supervisors can now assign multiple work queue items to a caseworker in a single action.',
    },
    {
      version: '3.3',
      date: new Date('2026-06-06'),
      service: 'Child Registration',
      heading: 'Improved duplicate detection',
      summary: 'Higher-confidence matches surface first, cutting the false-positive rate by approximately 30%.',
    },
    {
      version: '3.2',
      date: new Date('2026-05-23'),
      service: 'Subsidy',
      heading: 'Custody court order attachments',
      summary: 'Upload and attach custody court order documents directly to a child record.',
    },
  ];
}
