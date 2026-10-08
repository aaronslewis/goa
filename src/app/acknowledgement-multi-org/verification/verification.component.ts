import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  GoabButton,
  GoabContainer,
  GoabFormItem,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
  GoabTextArea,
} from '@abgov/angular-components';
import type { GoabRadioGroupOnChangeDetail, GoabTextAreaOnChangeDetail } from '@abgov/ui-components-common';
import { verificationSectionsFor } from '../shared/acknowledgement-data';
import { Answer, AckMultiOrgStateService } from '../shared/acknowledgement-state.service';

@Component({
  selector: 'app-ack-multi-org-verification',
  standalone: true,
  imports: [
    RouterLink,
    GoabButton,
    GoabContainer,
    GoabFormItem,
    GoabLink,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
    GoabTextArea,
  ],
  templateUrl: './verification.component.html',
  styleUrls: ['../shared/question-page.scss'],
})
export class VerificationMultiOrgComponent implements OnInit {
  readonly state = inject(AckMultiOrgStateService);
  private readonly router = inject(Router);

  readonly sections = computed(() => verificationSectionsFor(this.state.currentOrg()));

  // Edits stay local until "Next", so leaving with Back doesn't change the task status.
  readonly answer = signal<Answer>(this.state.verification());
  readonly issue = signal(this.state.verificationIssue());
  readonly answerError = signal('');
  readonly issueError = signal('');

  ngOnInit(): void {
    // Reached by URL before step 1 is done: the task list explains why this step is locked.
    if (this.state.verificationStatus() === 'cannot-start') {
      this.router.navigate(['/acknowledgement-multi-org'], { replaceUrl: true });
    }
  }

  onAnswer(detail: GoabRadioGroupOnChangeDetail): void {
    this.answer.set(detail.value as Answer);
    this.answerError.set('');
  }

  onIssue(detail: GoabTextAreaOnChangeDetail): void {
    this.issue.set(detail.value);
    this.issueError.set('');
  }

  save(): void {
    if (!this.answer()) {
      this.answerError.set('Select whether the information is correct.');
      return;
    }
    if (this.answer() === 'no' && !this.issue().trim()) {
      this.issueError.set('Tell us what information is not correct.');
      return;
    }
    this.state.verification.set(this.answer());
    this.state.verificationIssue.set(this.answer() === 'no' ? this.issue() : '');
    // A "No" stops the run: the user can't continue until their details are corrected.
    this.router.navigate(this.answer() === 'yes' ? ['/acknowledgement-multi-org/terms'] : ['/acknowledgement-multi-org']);
  }
}
