import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

export type TileAccent = 'emergency' | 'warning' | 'success' | 'info';

export interface Tile {
  label: string;
  count: number;
  accent: TileAccent;
  period: string;
}

export interface Todo {
  id: string;
  priority: 'high' | 'medium' | 'low';
  text: string;
  due?: string;
}

export interface Assignment {
  name: string;
  url: string;
}

export interface ActivityItem {
  id: string;
  icon: string;
  description: string;
  timestamp: Date;
}

export interface DashboardRole {
  id: string;
  label: string;
  assignmentsHeading: string;
  tiles: Tile[];
  todos: Todo[];
  assignments: Assignment[];
  activity: ActivityItem[];
}

@Component({
  selector: 'generic-dashboard',
  standalone: true,
  imports: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './generic-dashboard.component.html',
  styleUrl: './generic-dashboard.component.scss',
})
export class GenericDashboardComponent {
  readonly userName = 'Edna Mode';
  readonly today = new Date();

  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  readonly roles: DashboardRole[] = [
    {
      id: 'licensing',
      label: 'Licensing officer',
      assignmentsHeading: 'My caseload',
      tiles: [
        { label: 'Incident reports raised', count: 3, accent: 'emergency', period: 'Past 30 days' },
        { label: 'Non-compliance cases raised', count: 8, accent: 'warning', period: 'Past 30 days' },
        { label: 'Inspections completed', count: 5, accent: 'success', period: 'Past 30 days' },
        { label: 'Licences reviewed', count: 12, accent: 'info', period: 'Past 30 days' },
      ],
      todos: [
        { id: 't1', priority: 'high', text: 'Calamari Kindergarden licence expiring Oct 12, 2026 — action required', due: 'Oct 12, 2026' },
        { id: 't2', priority: 'high', text: 'Scott\'s Tots non-compliance must be resolved before May 20, 2026', due: 'May 20, 2026' },
        { id: 't3', priority: 'medium', text: 'Complete draft inspection for MSPC Daycare' },
        { id: 't4', priority: 'medium', text: 'Review critical incident report for Tiramisu Daycare' },
        { id: 't5', priority: 'low', text: 'Tiramisu Daycare insurance documentation expiring in a month' },
      ],
      assignments: [
        { name: 'Calamari Kindergarden', url: '#' },
        { name: 'Tiramisu Daycare', url: '#' },
        { name: 'MSPC Daycare', url: '#' },
        { name: 'Scott\'s Tots', url: '#' },
        { name: 'Dunder Mifflin Family Day Homes', url: '#' },
        { name: 'Rainbow Bridge Child Care', url: '#' },
        { name: 'Sunflower Learning Centre', url: '#' },
      ],
      activity: [
        { id: 'a1', icon: 'document-text', description: 'Complaint Form uploaded by Scott\'s Tots', timestamp: new Date('2026-07-14T11:00:00') },
        { id: 'a2', icon: 'alert-circle', description: 'Non-compliance updated by Dunder Mifflin Family Day Homes', timestamp: new Date('2026-07-14T09:30:00') },
        { id: 'a3', icon: 'warning', description: 'Critical incident report submitted for Tiramisu Daycare', timestamp: new Date('2026-07-14T09:00:00') },
        { id: 'a4', icon: 'checkmark-circle', description: 'Inspection completed for Rainbow Bridge Child Care', timestamp: new Date('2026-07-13T14:20:00') },
        { id: 'a5', icon: 'ribbon', description: 'Licence renewed for Sunflower Learning Centre', timestamp: new Date('2026-07-12T10:00:00') },
      ],
    },
    {
      id: 'claims',
      label: 'Claims officer',
      assignmentsHeading: 'My assignments',
      tiles: [
        { label: 'Claims to assess', count: 14, accent: 'warning', period: 'This week' },
        { label: 'Adjustments pending', count: 6, accent: 'emergency', period: 'This week' },
        { label: 'Claims assessed', count: 22, accent: 'success', period: 'Past 30 days' },
        { label: 'Payment statements issued', count: 9, accent: 'info', period: 'Past 30 days' },
      ],
      todos: [
        { id: 't1', priority: 'high', text: '45 claims adjustment requests for the claim period May 2026 — review required', due: 'Jul 20, 2026' },
        { id: 't2', priority: 'high', text: 'Submit payment statements for June 2026 period', due: 'Jul 15, 2026' },
        { id: 't3', priority: 'medium', text: 'Assess 6 pending claims for Happy Kids Child Care' },
        { id: 't4', priority: 'medium', text: 'Verify adjusted claim submission from Maple Grove Child Care' },
        { id: 't5', priority: 'low', text: 'Review payment statement history for Bright Beginnings Preschool' },
      ],
      assignments: [
        { name: 'Happy Kids Child Care', url: '#' },
        { name: 'Maple Grove Child Care', url: '#' },
        { name: 'Bright Beginnings Preschool', url: '#' },
        { name: 'Little Explorers Daycare', url: '#' },
        { name: 'Sunshine Valley Daycare', url: '#' },
        { name: 'Westview Family Day Home', url: '#' },
      ],
      activity: [
        { id: 'a1', icon: 'card', description: 'Payment statement issued for Happy Kids Child Care', timestamp: new Date('2026-07-14T10:30:00') },
        { id: 'a2', icon: 'document-text', description: 'Adjustment submitted by Maple Grove Child Care', timestamp: new Date('2026-07-14T09:15:00') },
        { id: 'a3', icon: 'checkmark-circle', description: 'Claim assessed for Little Explorers Daycare', timestamp: new Date('2026-07-13T16:00:00') },
        { id: 'a4', icon: 'document-text', description: 'New claim submitted by Sunshine Valley Daycare', timestamp: new Date('2026-07-13T11:00:00') },
        { id: 'a5', icon: 'checkmark-circle', description: 'Claim assessed for Westview Family Day Home', timestamp: new Date('2026-07-12T09:00:00') },
      ],
    },
    {
      id: 'subsidy',
      label: 'Subsidy officer',
      assignmentsHeading: 'My work queue',
      tiles: [
        { label: 'Applications to review', count: 9, accent: 'warning', period: 'This week' },
        { label: 'Pending decisions', count: 4, accent: 'emergency', period: 'Overdue' },
        { label: 'Applications approved', count: 17, accent: 'success', period: 'Past 30 days' },
        { label: 'Documents requested', count: 3, accent: 'info', period: 'Awaiting response' },
      ],
      todos: [
        { id: 't1', priority: 'high', text: 'Application for Johnson family — decision overdue since Jul 8, 2026', due: 'Jul 8, 2026' },
        { id: 't2', priority: 'high', text: 'Request missing custody court order from Rodriguez family' },
        { id: 't3', priority: 'medium', text: 'Review subsidy renewal for Chen family — due Jul 18, 2026', due: 'Jul 18, 2026' },
        { id: 't4', priority: 'medium', text: 'Verify income documentation for Patel family application' },
        { id: 't5', priority: 'low', text: 'Follow up on missing documents from Williams family' },
      ],
      assignments: [
        { name: 'Johnson family — SE-1042', url: '#' },
        { name: 'Rodriguez family — SE-1038', url: '#' },
        { name: 'Chen family — SE-1031', url: '#' },
        { name: 'Patel family — SE-1029', url: '#' },
        { name: 'Williams family — SE-1021', url: '#' },
        { name: 'Nguyen family — SE-1018', url: '#' },
        { name: 'Brown family — SE-1015', url: '#' },
        { name: 'Singh family — SE-1009', url: '#' },
      ],
      activity: [
        { id: 'a1', icon: 'checkmark-circle', description: 'Application approved for Nguyen family', timestamp: new Date('2026-07-14T11:30:00') },
        { id: 'a2', icon: 'document-text', description: 'New application submitted by Singh family', timestamp: new Date('2026-07-14T10:00:00') },
        { id: 'a3', icon: 'mail', description: 'Document request sent to Williams family', timestamp: new Date('2026-07-13T14:00:00') },
        { id: 'a4', icon: 'document-text', description: 'Income documents received from Patel family', timestamp: new Date('2026-07-13T09:30:00') },
        { id: 'a5', icon: 'close-circle', description: 'Application declined for Brown family — income threshold exceeded', timestamp: new Date('2026-07-12T16:00:00') },
      ],
    },
  ];

  selectedRoleId = 'licensing';

  get role(): DashboardRole {
    return this.roles.find(r => r.id === this.selectedRoleId) ?? this.roles[0];
  }

  tileContainerType(accent: TileAccent): string {
    const map: Record<TileAccent, string> = {
      emergency: 'error',
      warning: 'important',
      success: 'success',
      info: 'info',
    };
    return map[accent];
  }

  priorityLabel(priority: string): string {
    const map: Record<string, string> = { high: 'High', medium: 'Medium', low: 'Low' };
    return map[priority] ?? priority;
  }

  todoBadgeType(priority: string): string {
    const map: Record<string, string> = { high: 'emergency', medium: 'important', low: 'information' };
    return map[priority] ?? 'information';
  }

  onRoleChange(event: Event): void {
    this.selectedRoleId = (event.target as HTMLSelectElement).value;
  }
}
