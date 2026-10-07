import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GoabBadge, GoabCallout, GoabLink, GoabTable, GoabText } from '@abgov/angular-components';
import type { GoabBadgeType } from '@abgov/ui-components-common';
import { AcknowledgementV2StateService, TaskStatus } from '../shared/acknowledgement-state.service';

// Colours follow the task list page pattern's written guidance ("In progress" dark grey,
// "Cannot start yet" light grey). The pattern's sample code uses `default` for "Cannot start
// yet", but in v2 `default` renders dark grey and `archived` light grey. A step that's ready
// but not begun reads "Start" rather than the pattern's "Not started", as an invitation to begin.
const STATUS_BADGE: Record<TaskStatus, { type: GoabBadgeType; content: string }> = {
  completed: { type: 'success', content: 'Completed' },
  'in-progress': { type: 'default', content: 'In progress' },
  'not-started': { type: 'information', content: 'Start' },
  'cannot-start': { type: 'archived', content: 'Cannot start yet' },
};

@Component({
  selector: 'app-acknowledgement-v2-task-list',
  standalone: true,
  imports: [RouterLink, GoabBadge, GoabCallout, GoabLink, GoabTable, GoabText],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class AcknowledgementV2TaskListComponent {
  readonly state = inject(AcknowledgementV2StateService);

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

  badge(status: TaskStatus) {
    return STATUS_BADGE[status];
  }
}
