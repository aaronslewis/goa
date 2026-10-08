import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  GoabButton,
  GoabContainer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabIcon,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
  GoabTextArea,
} from '@abgov/angular-components';
import type {
  GoabDropdownOnChangeDetail,
  GoabRadioGroupOnChangeDetail,
  GoabTextAreaOnChangeDetail,
} from '@abgov/ui-components-common';
import { ACCOUNT, programsFor } from '../shared/acknowledgement-data';
import { Answer, AckMultiOrgStateService } from '../shared/acknowledgement-state.service';

@Component({
  selector: 'app-ack-multi-org-declaration',
  standalone: true,
  imports: [
    RouterLink,
    GoabButton,
    GoabContainer,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
    GoabIcon,
    GoabLink,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
    GoabTextArea,
  ],
  templateUrl: './declaration.component.html',
  styleUrls: ['../shared/question-page.scss'],
})
export class DeclarationMultiOrgComponent {
  readonly state = inject(AckMultiOrgStateService);
  private readonly router = inject(Router);

  readonly account = ACCOUNT;
  readonly programs = computed(() => programsFor(this.state.currentOrg()));

  // Mirrors the dropdown so a rejected pick can be undone: setting it back to the current
  // organization only re-renders the dropdown if the bound value actually changed first.
  readonly orgValue = signal(this.state.currentOrgId());
  readonly orgError = signal('');

  // Edits stay local until "Next", so leaving with Back doesn't change the task status.
  readonly answer = signal<Answer>(this.state.declaration());
  readonly issue = signal(this.state.declarationIssue());
  readonly answerError = signal('');
  readonly issueError = signal('');

  onOrgChange(detail: GoabDropdownOnChangeDetail): void {
    const id = detail.value ?? '';
    const org = this.state.organizations.find((o) => o.id === id);
    if (!org || id === this.state.currentOrgId()) return;
    if (this.state.isCompleted(org)) {
      this.orgError.set('You’ve already acknowledged this organization. Choose one without a checkmark.');
      this.orgValue.set(id);
      setTimeout(() => this.orgValue.set(this.state.currentOrgId()));
      return;
    }
    this.orgError.set('');
    this.state.selectOrg(id);
    this.orgValue.set(id);
    this.answer.set('');
    this.issue.set('');
    this.answerError.set('');
    this.issueError.set('');
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
    this.state.declaration.set(this.answer());
    this.state.declarationIssue.set(this.answer() === 'no' ? this.issue() : '');
    // A "No" stops the run: the user can't continue until their details are corrected.
    this.router.navigate(this.answer() === 'yes' ? ['/acknowledgement-multi-org/verification'] : ['/acknowledgement-multi-org']);
  }
}
