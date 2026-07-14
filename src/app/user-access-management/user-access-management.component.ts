import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ProgramService } from '../services/program.service';
import { ProgramSelectorComponent } from '../program-selector/program-selector.component';

type AccessStatus = 'active' | 'inactive' | 'pending' | 'on-leave';
type OrgStatusFilter = 'all' | 'active' | 'partial' | 'inactive' | 'on-leave';
type ManageMode = 'deactivate' | 'reactivate';
type DeactivateReason = 'offboard' | 'leave';

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  status: AccessStatus;
  email: string;
  services: string[];
}

interface ProgramAccess {
  programId: string;
  programName: string;
  role: string;
  status: AccessStatus;
  services: string[];
  returnDate?: string;
}

interface OrgUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  access: ProgramAccess[];
}

interface AggregateStatus {
  status: 'active' | 'inactive' | 'partial' | 'on-leave';
  returnDate?: string;
  activeCount: number;
  total: number;
}

// Single source of truth: a person's access is a list of per-program grants.
// The per-program table (below) is just this data filtered to one program.
const ORG_USERS: OrgUser[] = [
  {
    id: 'u1',
    firstName: 'Kavita',
    lastName: 'Bhalerao',
    email: 'kavitabhalerao@gmail.com',
    access: [
      {
        programId: '1',
        programName: 'Manning Family Day Home Program',
        role: 'Access Manager',
        status: 'active',
        services: ['Affordability Grant', 'Child Registration', 'Claims Adjustments', 'Claims Submission', 'Licensing'],
      },
      {
        programId: '2',
        programName: 'ABC Program',
        role: 'Staff',
        status: 'active',
        services: ['ECWSGA', 'FDHA Contract'],
      },
      {
        programId: '3',
        programName: 'ABC Child Development Centre',
        role: 'Staff',
        status: 'inactive',
        services: ['Licensing'],
      },
    ],
  },
  {
    id: 'u2',
    firstName: 'James',
    lastName: 'Harrington',
    email: 'james.harrington@example.com',
    access: [
      {
        programId: '1',
        programName: 'Manning Family Day Home Program',
        role: 'Staff',
        status: 'active',
        services: ['Child Registration', 'Claims Submission'],
      },
    ],
  },
  {
    id: 'u3',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@example.com',
    access: [
      {
        programId: '2',
        programName: 'ABC Program',
        role: 'Super Admin',
        status: 'active',
        services: ['ECWSGA', 'FDHA Contract'],
      },
    ],
  },
  {
    id: 'u4',
    firstName: 'Mark',
    lastName: 'Williams',
    email: 'mark.williams@example.com',
    access: [
      {
        programId: '1',
        programName: 'Manning Family Day Home Program',
        role: 'Staff',
        status: 'on-leave',
        services: ['Child Registration'],
        returnDate: '2026-08-15',
      },
    ],
  },
  {
    id: 'u5',
    firstName: 'Jordan',
    lastName: 'Lee',
    email: 'jordan.lee@example.com',
    access: [
      {
        programId: '1',
        programName: 'Manning Family Day Home Program',
        role: 'Staff',
        status: 'inactive',
        services: ['Licensing'],
      },
      {
        programId: '3',
        programName: 'ABC Child Development Centre',
        role: 'Staff',
        status: 'inactive',
        services: ['FDHA Contract'],
      },
    ],
  },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

@Component({
  selector: 'user-access-management',
  standalone: true,
  imports: [ProgramSelectorComponent, NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-access-management.component.html',
  styleUrl: './user-access-management.component.scss',
})
export class UserAccessManagementComponent {
  protected readonly programService = inject(ProgramService);

  // Per-program view
  protected readonly searchQuery = signal('');
  protected readonly inviteModalOpen = signal(false);
  protected readonly infoExpanded = signal(true);

  // Organization-wide view (Super Admin only)
  protected readonly orgView = signal(false);
  protected readonly orgSearchQuery = signal('');
  protected readonly orgStatusFilter = signal<OrgStatusFilter>('all');
  protected readonly successMessage = signal<string | null>(null);

  // Manage access modal
  protected readonly manageModalOpen = signal(false);
  protected readonly manageUser = signal<OrgUser | null>(null);
  protected readonly manageMode = signal<ManageMode>('deactivate');
  protected readonly selectedProgramIds = signal<Set<string>>(new Set());
  protected readonly deactivateReason = signal<DeactivateReason>('offboard');
  protected readonly returnDate = signal('');

  protected readonly todayIso = new Date().toISOString().slice(0, 10);

  get staff(): StaffMember[] {
    const programId = this.programService.selectedProgram()?.id;
    if (!programId) return [];
    const all: StaffMember[] = ORG_USERS.flatMap((u) =>
      u.access
        .filter((a) => a.programId === programId)
        .map((a) => ({
          id: `${u.id}-${a.programId}`,
          firstName: u.firstName,
          lastName: u.lastName,
          role: a.role,
          status: a.status,
          email: u.email,
          services: a.services,
        })),
    );
    const q = this.searchQuery().toLowerCase();
    if (!q) return all;
    return all.filter(
      (s) =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q),
    );
  }

  get orgUsers(): Array<OrgUser & { aggStatus: AggregateStatus }> {
    const q = this.orgSearchQuery().toLowerCase();
    const filter = this.orgStatusFilter();
    return ORG_USERS.map((u) => ({ ...u, aggStatus: this.aggregateStatus(u) })).filter((u) => {
      if (q && !`${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q)) return false;
      if (filter !== 'all' && u.aggStatus.status !== filter) return false;
      return true;
    });
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onOrgSearch(event: Event): void {
    this.orgSearchQuery.set((event.target as HTMLInputElement).value);
  }

  onStatusFilterChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.orgStatusFilter.set((detail?.value as OrgStatusFilter) ?? 'all');
  }

  setOrgView(orgView: boolean): void {
    this.orgView.set(orgView);
    this.successMessage.set(null);
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

  statusType(status: AccessStatus): string {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'information';
      case 'on-leave':
        return 'important';
      default:
        return 'emergency';
    }
  }

  statusLabel(status: AccessStatus): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'on-leave':
        return 'On leave';
      default:
        return 'Inactive';
    }
  }

  private aggregateStatus(user: OrgUser): AggregateStatus {
    const total = user.access.length;
    const activeCount = user.access.filter((a) => a.status === 'active').length;
    const onLeave = user.access.find((a) => a.status === 'on-leave');
    if (onLeave) {
      return { status: 'on-leave', returnDate: onLeave.returnDate, activeCount, total };
    }
    if (activeCount === total) return { status: 'active', activeCount, total };
    if (activeCount === 0) return { status: 'inactive', activeCount, total };
    return { status: 'partial', activeCount, total };
  }

  orgStatusBadgeType(status: AggregateStatus['status']): string {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'emergency';
      case 'on-leave':
        return 'important';
      default:
        return 'information';
    }
  }

  orgStatusLabel(status: AggregateStatus['status']): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'on-leave':
        return 'On leave';
      default:
        return 'Partially active';
    }
  }

  hasActivePrograms(user: OrgUser): boolean {
    return user.access.some((a) => a.status === 'active');
  }

  hasInactivePrograms(user: OrgUser): boolean {
    return user.access.some((a) => a.status === 'inactive' || a.status === 'on-leave');
  }

  formatDate(iso: string | undefined): string {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
  }

  accessDescription(a: ProgramAccess): string {
    const label = this.statusLabel(a.status);
    if (a.status === 'on-leave' && a.returnDate) {
      return `${a.role} · ${label} · Returns ${this.formatDate(a.returnDate)}`;
    }
    return `${a.role} · ${label}`;
  }

  openManageModal(user: OrgUser, mode: ManageMode): void {
    this.successMessage.set(null);
    this.manageUser.set(user);
    this.manageMode.set(mode);
    const relevant = mode === 'deactivate'
      ? user.access.filter((a) => a.status === 'active')
      : user.access.filter((a) => a.status === 'inactive' || a.status === 'on-leave');
    this.selectedProgramIds.set(new Set(relevant.map((a) => a.programId)));
    this.deactivateReason.set('offboard');
    this.returnDate.set('');
    this.manageModalOpen.set(true);
  }

  closeManageModal(): void {
    this.manageModalOpen.set(false);
  }

  relevantAccess(): ProgramAccess[] {
    const user = this.manageUser();
    if (!user) return [];
    return this.manageMode() === 'deactivate'
      ? user.access.filter((a) => a.status === 'active')
      : user.access.filter((a) => a.status === 'inactive' || a.status === 'on-leave');
  }

  toggleProgram(programId: string): void {
    this.selectedProgramIds.update((set) => {
      const next = new Set(set);
      if (next.has(programId)) next.delete(programId);
      else next.add(programId);
      return next;
    });
  }

  onReasonChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.deactivateReason.set((detail?.value as DeactivateReason) ?? 'offboard');
  }

  onReturnDateChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.returnDate.set(detail?.value ?? '');
  }

  get modalHeading(): string {
    const user = this.manageUser();
    if (!user) return '';
    const action = this.manageMode() === 'deactivate' ? 'Deactivate access' : 'Reactivate access';
    return `${action} - ${user.firstName} ${user.lastName}`;
  }

  get calloutHeading(): string {
    return this.manageMode() === 'deactivate'
      ? 'What happens when you deactivate access'
      : 'What happens when you reactivate access';
  }

  get calloutBody(): string {
    const first = this.manageUser()?.firstName ?? 'This person';
    return this.manageMode() === 'deactivate'
      ? `${first} won't be able to sign in to the programs you select below. You can reactivate access at any time.`
      : `${first} can sign in again to the programs you select below.`;
  }

  get primaryActionLabel(): string {
    return this.manageMode() === 'deactivate' ? 'Deactivate access' : 'Reactivate access';
  }

  get canSubmit(): boolean {
    if (this.selectedProgramIds().size === 0) return false;
    if (this.manageMode() === 'deactivate' && this.deactivateReason() === 'leave' && !this.returnDate()) return false;
    return true;
  }

  get summaryText(): string {
    const user = this.manageUser();
    if (!user) return '';
    const ids = this.selectedProgramIds();
    const names = user.access.filter((a) => ids.has(a.programId)).map((a) => a.programName);
    if (names.length === 0) return 'Select at least one program.';
    const list = names.join(', ');
    if (this.manageMode() === 'deactivate') {
      if (this.deactivateReason() === 'leave' && this.returnDate()) {
        return `This deactivates access to ${list} now. Access turns back on ${this.formatDate(this.returnDate())}.`;
      }
      return `This deactivates access to ${list}.`;
    }
    return `This reactivates access to ${list}.`;
  }

  submitManage(): void {
    const user = this.manageUser();
    if (!user || !this.canSubmit) return;
    const ids = this.selectedProgramIds();
    const mode = this.manageMode();
    const reason = this.deactivateReason();
    const date = this.returnDate();

    user.access.forEach((a) => {
      if (!ids.has(a.programId)) return;
      if (mode === 'deactivate') {
        a.status = reason === 'leave' ? 'on-leave' : 'inactive';
        a.returnDate = reason === 'leave' ? date : undefined;
      } else {
        a.status = 'active';
        a.returnDate = undefined;
      }
    });

    const count = ids.size;
    const programWord = count === 1 ? 'program' : 'programs';
    const name = `${user.firstName} ${user.lastName}`;
    if (mode === 'deactivate') {
      this.successMessage.set(
        reason === 'leave'
          ? `You deactivated ${name}'s access to ${count} ${programWord}. Access turns back on ${this.formatDate(date)}.`
          : `You deactivated ${name}'s access to ${count} ${programWord}.`,
      );
    } else {
      this.successMessage.set(`You reactivated ${name}'s access to ${count} ${programWord}.`);
    }
    this.manageModalOpen.set(false);
  }
}
