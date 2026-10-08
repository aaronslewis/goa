import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GoabBadge, GoabButton, GoabCallout, GoabLink, GoabTable, GoabText } from '@abgov/angular-components';
import type { GoabBadgeType } from '@abgov/ui-components-common';
import { GRACE_PERIOD_ENDED } from '../shared/acknowledgement-data';
import { AckMultiOrgStateService, TaskStatus } from '../shared/acknowledgement-state.service';

// Colours follow the task list page pattern's written guidance ("In progress" dark grey,
// "Cannot start yet" light grey). The pattern's sample code uses `default` for "Cannot start
// yet", but in v2 `default` renders dark grey and `archived` light grey. A step that's ready
// but not begun gets a Start button in the template instead of a badge.
const STATUS_BADGE: Record<TaskStatus, { type: GoabBadgeType; content: string }> = {
  completed: { type: 'success', content: 'Completed' },
  'in-progress': { type: 'default', content: 'In progress' },
  'not-started': { type: 'information', content: 'Start' },
  'cannot-start': { type: 'archived', content: 'Cannot start yet' },
};

@Component({
  selector: 'app-ack-multi-org-task-list',
  standalone: true,
  imports: [RouterLink, GoabBadge, GoabButton, GoabCallout, GoabLink, GoabTable, GoabText],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class AckMultiOrgTaskListComponent {
  readonly state = inject(AckMultiOrgStateService);
  readonly gracePeriodEnded = GRACE_PERIOD_ENDED;
  private readonly router = inject(Router);

  readonly steps = computed(() => [
    {
      title: 'Step 1 – Declaration',
      description: 'Confirm your legal name, organization and its licensed programs',
      path: 'declaration',
      status: this.state.declarationStatus(),
    },
    {
      title: 'Step 2 – Verification',
      description: 'Verify your organization and signing authority',
      path: 'verification',
      status: this.state.verificationStatus(),
    },
    {
      title: 'Step 3 – Acknowledgement',
      description: 'Review and agree to the terms',
      path: 'terms',
      status: this.state.termsStatus(),
    },
  ]);

  // Locked steps can't be opened, and once submitted the acknowledgement is final.
  canOpen(status: TaskStatus): boolean {
    return !this.state.submitted() && status !== 'cannot-start';
  }

  start(path: string): void {
    this.router.navigate(['/acknowledgement-multi-org', path]);
  }

  badge(status: TaskStatus) {
    return STATUS_BADGE[status];
  }
}
