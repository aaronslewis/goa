import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ProgramService } from '../services/program.service';
import { ProgramSelectorComponent } from '../program-selector/program-selector.component';

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  email: string;
  services: string[];
}

const MOCK_STAFF: Record<string, StaffMember[]> = {
  '1': [
    {
      id: 'u1',
      firstName: 'Kavita',
      lastName: 'Bhalerao',
      role: 'Access Manager',
      status: 'active',
      email: 'kavitabhalerao@gmail.com',
      services: [
        'Affordability Grant',
        'Child Registration',
        'Claims Adjustments',
        'Claims Submission',
        'Early Childhood Educator Workforce Supports Grant Agreement',
        'Family Day Home Agency Contract',
        'Licensing',
        'Payment Statements',
      ],
    },
    {
      id: 'u2',
      firstName: 'James',
      lastName: 'Harrington',
      role: 'Staff',
      status: 'active',
      email: 'james.harrington@example.com',
      services: ['Child Registration', 'Claims Submission'],
    },
  ],
  '2': [
    {
      id: 'u3',
      firstName: 'Priya',
      lastName: 'Sharma',
      role: 'Super Admin',
      status: 'active',
      email: 'priya.sharma@example.com',
      services: ['Affordability Grant', 'Licensing', 'Payment Statements'],
    },
  ],
  '3': [],
  '4': [
    {
      id: 'u4',
      firstName: 'Mark',
      lastName: 'Williams',
      role: 'Staff',
      status: 'pending',
      email: 'mark.williams@example.com',
      services: ['Child Registration'],
    },
  ],
};

@Component({
  selector: 'user-access-management',
  standalone: true,
  imports: [ProgramSelectorComponent, TitleCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-access-management.component.html',
  styleUrl: './user-access-management.component.scss',
})
export class UserAccessManagementComponent {
  protected readonly programService = inject(ProgramService);

  protected readonly searchQuery = signal('');
  protected readonly inviteModalOpen = signal(false);
  protected readonly infoExpanded = signal(true);

  get staff(): StaffMember[] {
    const programId = this.programService.selectedProgram()?.id;
    if (!programId) return [];
    const all = MOCK_STAFF[programId] ?? [];
    const q = this.searchQuery().toLowerCase();
    if (!q) return all;
    return all.filter(
      (s) =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q),
    );
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  toggleInfo(): void {
    this.infoExpanded.update((v) => !v);
  }

  openInviteModal(): void {
    this.inviteModalOpen.set(true);
  }

  closeInviteModal(): void {
    this.inviteModalOpen.set(false);
  }

  statusType(status: StaffMember['status']): string {
    return status === 'active' ? 'success' : status === 'pending' ? 'information' : 'emergency';
  }
}
