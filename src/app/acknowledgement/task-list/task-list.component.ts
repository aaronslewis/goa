import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GoabBadge, GoabCallout, GoabLink, GoabTable, GoabText } from '@abgov/angular-components';
import type { GoabBadgeType } from '@abgov/ui-components-common';
import { ACCOUNT, PROGRAMS } from '../shared/acknowledgement-data';
import { AcknowledgementStateService, TaskStatus } from '../shared/acknowledgement-state.service';

// Status names and colours follow the task list page pattern's written guidance
// ("In progress" dark grey, "Cannot start yet" light grey). Its sample code uses `default`
// for "Cannot start yet", but in v2 `default` renders dark grey and `archived` light grey.
const STATUS_BADGE: Record<TaskStatus, { type: GoabBadgeType; content: string }> = {
  completed: { type: 'success', content: 'Completed' },
  'in-progress': { type: 'default', content: 'In progress' },
  'not-started': { type: 'information', content: 'Not started' },
  'cannot-start': { type: 'archived', content: 'Cannot start yet' },
};

@Component({
  selector: 'app-acknowledgement-task-list',
  standalone: true,
  imports: [RouterLink, GoabBadge, GoabCallout, GoabLink, GoabTable, GoabText],
  templateUrl: './task-list.component.html',
})
export class AcknowledgementTaskListComponent {
  readonly state = inject(AcknowledgementStateService);
  readonly account = ACCOUNT;
  readonly programCount = PROGRAMS.length;
  readonly taskCount = 3;

  badge(status: TaskStatus) {
    return STATUS_BADGE[status];
  }
}
