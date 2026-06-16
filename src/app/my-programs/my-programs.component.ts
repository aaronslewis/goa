import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, computed } from '@angular/core';
import { ProgramService, UserRole, VisitType, Program } from '../services/program.service';
import { ProgramSelectorComponent } from '../program-selector/program-selector.component';

interface Step {
  icon: string;
  title: string;
  desc: string;
  state: 'done' | 'active' | 'todo';
  ctaLabel?: string;
}

interface ActionItem {
  urgency: 'urgent' | 'warn' | 'info';
  title: string;
  meta: string;
  cta: string;
}

interface ServiceCard {
  icon: string;
  name: string;
  desc: string;
  alertType: 'ok' | 'warn' | 'info' | 'locked' | '';
  alertMsg: string;
  locked: boolean;
}

@Component({
  selector: 'my-programs',
  standalone: true,
  imports: [ProgramSelectorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './my-programs.component.html',
  styleUrl: './my-programs.component.scss',
})
export class MyProgramsComponent {
  protected readonly ps = inject(ProgramService);

  // ── Prototype controls ────────────────────────────────────────────────────

  setRole(role: UserRole): void {
    this.ps.setRole(role);
  }

  setVisit(type: VisitType): void {
    this.ps.setVisitType(type);
  }

  // ── Getting-started steps ─────────────────────────────────────────────────

  readonly steps = computed<Step[]>(() => {
    const role = this.ps.role();
    const hasProg = this.ps.hasProgram();

    if (role === 'super-admin') {
      return [
        { icon: 'checkmark-circle', title: 'Create your account', desc: 'Invitation accepted, account verified.', state: 'done' },
        { icon: 'checkmark-circle', title: 'Complete the acknowledgement', desc: 'Accepted Jun 1, 2026 — you are now Super Admin.', state: 'done' },
        {
          icon: 'business',
          title: 'Select your program',
          desc: hasProg
            ? `${this.ps.selectedProgram()!.name} selected.`
            : 'Choose the program you manage — you can add more programs later.',
          state: hasProg ? 'done' : 'active',
          ctaLabel: hasProg ? undefined : 'Select program',
        },
        {
          icon: 'document-text',
          title: 'Sign program agreements',
          desc: '2 contracts pending — required before submitting claims or accessing funding.',
          state: hasProg ? 'active' : 'todo',
          ctaLabel: hasProg ? 'Review agreements' : undefined,
        },
        {
          icon: 'people',
          title: 'Invite your team',
          desc: 'Add staff and assign them service access for each program.',
          state: 'todo',
          ctaLabel: hasProg ? 'Invite staff' : undefined,
        },
      ];
    }

    if (role === 'access-manager') {
      return [
        { icon: 'checkmark-circle', title: 'Account created', desc: 'Invitation from Super Admin accepted.', state: 'done' },
        {
          icon: 'people',
          title: 'Invite staff to your program',
          desc: 'Add team members so they can submit claims and register children.',
          state: 'active',
          ctaLabel: 'Invite staff',
        },
        {
          icon: 'receipt',
          title: 'Submit your first monthly claim',
          desc: 'Claims are due by the 15th of each month.',
          state: 'todo',
          ctaLabel: 'View claims guide',
        },
      ];
    }

    // staff
    return [
      { icon: 'checkmark-circle', title: 'Account created', desc: 'Set up by your Access Manager.', state: 'done' },
      {
        icon: 'people',
        title: 'Register children in your program',
        desc: 'Add children enrolled in your care to begin tracking subsidized spots.',
        state: 'active',
        ctaLabel: 'Go to Child Registration',
      },
      {
        icon: 'receipt',
        title: 'Submit your first claim',
        desc: 'Monthly claims are due by the 15th.',
        state: 'todo',
        ctaLabel: 'View claims guide',
      },
    ];
  });

  readonly stepsComplete = computed(() => this.steps().filter((s) => s.state === 'done').length);
  readonly stepsTotal = computed(() => this.steps().length);
  readonly progressPct = computed(() => Math.round((this.stepsComplete() / this.stepsTotal()) * 100));

  // ── Action items (returning view) ────────────────────────────────────────

  readonly actions = computed<ActionItem[]>(() => {
    const role = this.ps.role();
    if (role === 'super-admin') {
      return [
        { urgency: 'urgent', title: 'Staff invite link expired — James Harrington', meta: 'Sent Jun 4 · Manning FDHP · Invite expired after 7 days', cta: 'Re-invite' },
        { urgency: 'urgent', title: '2 program agreements pending your signature', meta: 'Required to submit claims · Deadline Jun 30, 2026', cta: 'Sign now' },
        { urgency: 'warn', title: 'Licensing renewal due in 28 days', meta: 'ABC Child Development Centre · Expires Jul 10, 2026', cta: 'Review' },
        { urgency: 'info', title: 'New service available: Wage Top-Up Program', meta: 'Your programs may qualify — applications open Jul 1', cta: 'Learn more' },
      ];
    }
    if (role === 'access-manager') {
      return [
        { urgency: 'urgent', title: 'Access request from Maria Santos', meta: 'Requesting: Claims Submission, Child Registration · Manning FDHP', cta: 'Review' },
        { urgency: 'warn', title: "Tom Chen's invite expired 2 days ago", meta: 'Manning FDHP · Re-send to give access', cta: 'Re-invite' },
      ];
    }
    return [
      { urgency: 'urgent', title: 'Claims submission due in 3 days', meta: 'June 2026 claim · Manning Family Day Home Program', cta: 'Submit' },
      { urgency: 'info', title: '3 children pending registration', meta: 'Started but not yet submitted', cta: 'Continue' },
    ];
  });

  // ── Services ─────────────────────────────────────────────────────────────

  readonly services = computed<ServiceCard[]>(() => {
    const role = this.ps.role();
    const hasProg = this.ps.hasProgram();
    const progStatus = this.ps.selectedProgram()?.status;
    const agreementNeeded = progStatus === 'pending';

    if (role === 'super-admin') {
      return [
        { icon: 'shield-checkmark', name: 'Licensing', desc: 'License details & renewal', alertType: 'ok', alertMsg: 'Current', locked: false },
        { icon: 'people', name: 'Child Registration', desc: hasProg ? '12 children registered' : 'Register subsidized children', alertType: 'ok', alertMsg: 'Active', locked: false },
        { icon: 'receipt', name: 'Claims', desc: hasProg ? 'June claim due Jun 15' : 'Submit and track monthly claims', alertType: agreementNeeded ? 'locked' : 'warn', alertMsg: agreementNeeded ? 'Agreement needed' : 'Due soon', locked: agreementNeeded },
        { icon: 'cash', name: 'Funding / AG', desc: 'Affordability Grant payments', alertType: agreementNeeded ? 'locked' : 'ok', alertMsg: agreementNeeded ? 'Agreement needed' : 'Active', locked: agreementNeeded },
        { icon: 'bar-chart', name: 'Subsidized Children Report', desc: 'Monthly reporting', alertType: '', alertMsg: 'Available', locked: false },
        { icon: 'help-circle', name: 'Help Centre', desc: 'Guides and support', alertType: 'ok', alertMsg: 'Available', locked: false },
      ];
    }

    if (role === 'access-manager') {
      return [
        { icon: 'people', name: 'Child Registration', desc: '12 enrolled', alertType: 'ok', alertMsg: 'Active', locked: false },
        { icon: 'receipt', name: 'Claims', desc: 'June due Jun 15', alertType: 'warn', alertMsg: 'Due soon', locked: false },
        { icon: 'key', name: 'User Access Mgmt', desc: '1 pending request', alertType: 'warn', alertMsg: 'Review', locked: false },
        { icon: 'help-circle', name: 'Help Centre', desc: 'Guides and support', alertType: 'ok', alertMsg: 'Available', locked: false },
      ];
    }

    return [
      { icon: 'people', name: 'Child Registration', desc: '12 registered · 3 pending', alertType: 'info', alertMsg: '3 pending', locked: false },
      { icon: 'receipt', name: 'Submit Claims', desc: 'June claim not started', alertType: 'warn', alertMsg: 'Due Jun 15', locked: false },
      { icon: 'chatbox', name: 'Messages', desc: 'No new messages', alertType: 'ok', alertMsg: 'All clear', locked: false },
      { icon: 'help-circle', name: 'Help Centre', desc: 'Guides and support', alertType: 'ok', alertMsg: 'Available', locked: false },
    ];
  });

  // ── Programs visible per role ─────────────────────────────────────────────

  readonly visiblePrograms = computed<Program[]>(() => {
    const role = this.ps.role();
    if (role === 'super-admin') return this.ps.programs;
    if (role === 'access-manager') return [this.ps.programs[0]];
    return [this.ps.programs[0]];
  });

  // ── UI helpers ────────────────────────────────────────────────────────────

  readonly roleBadgeLabel = computed(() => {
    const map: Record<string, string> = { 'super-admin': 'Super Admin', 'access-manager': 'Access Manager', staff: 'Staff' };
    return map[this.ps.role()];
  });

  readonly welcomeTitle = computed(() => {
    const role = this.ps.role();
    const visit = this.ps.visitType();
    if (role === 'super-admin' && visit === 'first' && !this.ps.hasProgram())
      return "Welcome, Kavita. You've completed your acknowledgement.";
    if (role === 'super-admin' && visit === 'first' && this.ps.hasProgram())
      return 'Good start, Kavita. Complete your setup to unlock all services.';
    if (role === 'super-admin' && visit === 'returning') return 'Welcome back, Kavita.';
    if (role === 'access-manager' && visit === 'first')
      return 'Welcome. Your Super Admin has granted you access.';
    if (role === 'access-manager' && visit === 'returning') return 'Welcome back, Kavita.';
    if (role === 'staff' && visit === 'first')
      return 'Welcome. Your Access Manager has set up your account.';
    return 'Welcome back, Kavita.';
  });

  readonly welcomeSub = computed(() => {
    const role = this.ps.role();
    if (role === 'super-admin' && !this.ps.hasProgram())
      return "You're now a Super Admin. Start by selecting your program — all services will be tailored to it.";
    if (role === 'super-admin' && this.ps.hasProgram())
      return `2 steps remaining before you can submit claims and access funding for ${this.ps.selectedProgram()!.name}.`;
    if (role === 'access-manager')
      return 'As an Access Manager, you can invite staff and control which services they can use.';
    return 'You can access the services listed below for your assigned program.';
  });

  openSelector(): void {
    this.ps.openSelector();
  }

  selectProgram(id: string): void {
    this.ps.selectProgram(id);
  }

  isSelectedProgram(id: string): boolean {
    return this.ps.selectedProgram()?.id === id;
  }

  statusBadgeType(status: string): string {
    return status === 'authorized' ? 'success' : status === 'pending' ? 'information' : 'emergency';
  }

  statusLabel(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
