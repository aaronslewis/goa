import { Component, inject, signal } from '@angular/core';
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
import { ACCOUNT, VERIFICATION_SECTIONS } from '../shared/acknowledgement-data';
import { Answer, AcknowledgementStateService } from '../shared/acknowledgement-state.service';

@Component({
  selector: 'app-acknowledgement-verification',
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
export class VerificationComponent {
  private readonly state = inject(AcknowledgementStateService);
  private readonly router = inject(Router);

  readonly account = ACCOUNT;
  readonly sections = VERIFICATION_SECTIONS;

  // Edits stay local until "Save and continue", so leaving with Back doesn't change the task status.
  readonly answer = signal<Answer>(this.state.verification());
  readonly issue = signal(this.state.verificationIssue());
  readonly answerError = signal('');
  readonly issueError = signal('');

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
    this.router.navigate(['/acknowledgement']);
  }
}
