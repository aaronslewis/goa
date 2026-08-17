import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

type Channel = 'self-service' | 'staff';
type AccountStatus = 'active' | 'deactivated';

interface UpdateHistoryEntry {
  changedOn: string;
  from: string;
  to: string;
  changedBy: string;
  channel: Channel;
  reference?: string;
}

interface PersonalInfoField {
  label: string;
  currentValue: string;
  history: UpdateHistoryEntry[];
}

interface NavLink {
  label: string;
  hasChildren?: boolean;
}

@Component({
  selector: 'goa-user-management',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './goa-user-management.component.html',
  styleUrl: './goa-user-management.component.scss',
})
export class GoaUserManagementComponent {
  readonly navLinks: NavLink[] = [
    { label: 'Affordability Grant', hasChildren: true },
    { label: 'Agreement Configuration' },
    { label: 'Certification', hasChildren: true },
    { label: 'Child Registration', hasChildren: true },
    { label: 'Claims Adjustments', hasChildren: true },
    { label: 'Claims Submission' },
    { label: 'Family Day Home Agency Contract', hasChildren: true },
    { label: 'GOA User Management' },
    { label: 'Identity and Access Management' },
    { label: 'Licensing', hasChildren: true },
    { label: 'Payment Statements' },
    { label: 'Program User Management', hasChildren: true },
    { label: 'Space Creation' },
    { label: 'Subsidized Children Report' },
    { label: 'Subsidy', hasChildren: true },
    { label: 'Wage Top-Up & PD', hasChildren: true },
  ];

  readonly staffName = 'Nancy Trustworthy';
  readonly searchQuery = 'charlie.day@company.com';

  readonly user = {
    name: 'Charlie Day',
    email: 'charlie.day@company.com',
    accountStatus: 'Deleted',
    phone: '780-365-4218',
    accountCreationDate: '5 January 2024',
    lastLogin: '18 January 2025',
    accountRemovalDate: '15 July 2026, 9:00 am',
  };

  readonly manageSheetOpen = signal(false);
  readonly currentAccountStatus = signal<AccountStatus>('active');
  readonly pendingAccountStatus = signal<AccountStatus>('active');

  readonly isPendingDeactivation = computed(
    () => this.currentAccountStatus() === 'active' && this.pendingAccountStatus() === 'deactivated',
  );

  readonly personalInfoUpdates: PersonalInfoField[] = [
    {
      label: 'Email address',
      currentValue: 'charlie.day@company.com',
      history: [
        {
          changedOn: '10 January 2025',
          from: 'charlie.d@personalmail.com',
          to: 'charlie.day@company.com',
          changedBy: 'Charlie Day',
          channel: 'self-service',
        },
      ],
    },
    {
      label: 'Name',
      currentValue: 'Charlie Day',
      history: [],
    },
  ];

  updateCountLabel(field: PersonalInfoField): string {
    const count = field.history.length;
    if (count === 0) return 'No changes';
    return count === 1 ? '1 update' : `${count} updates`;
  }

  updateBadgeType(field: PersonalInfoField): string {
    return field.history.length === 0 ? 'light' : 'information';
  }

  channelLabel(channel: Channel): string {
    return channel === 'self-service' ? 'Self-service, made by the user' : 'Made by a GOA staff member';
  }

  lastChangedLabel(field: PersonalInfoField): string {
    const [latest] = field.history;
    return latest ? `Last changed ${latest.changedOn}` : '';
  }

  get activeStatusDescription(): string {
    return `${this.user.name} can sign in and use every program and role assigned below.`;
  }

  get deactivatedStatusDescription(): string {
    return `Removes ${this.user.name}'s access to every program and role below immediately.`;
  }

  openManageSheet(): void {
    this.pendingAccountStatus.set(this.currentAccountStatus());
    this.manageSheetOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeManageSheet(): void {
    this.manageSheetOpen.set(false);
    document.body.style.overflow = '';
  }

  onAccountStatusChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: AccountStatus }>).detail;
    if (detail?.value) this.pendingAccountStatus.set(detail.value);
  }

  saveManageSheet(): void {
    this.currentAccountStatus.set(this.pendingAccountStatus());
    this.closeManageSheet();
  }
}
