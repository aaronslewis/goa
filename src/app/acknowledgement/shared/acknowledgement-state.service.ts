import { Injectable, computed, signal } from '@angular/core';

export type Answer = '' | 'yes' | 'no';

export type TaskStatus = 'completed' | 'in-progress' | 'not-started' | 'cannot-start';

// Lives at root so answers survive moving between the task list and its question pages.
@Injectable({ providedIn: 'root' })
export class AcknowledgementStateService {
  readonly declaration = signal<Answer>('');
  readonly declarationIssue = signal('');
  readonly verification = signal<Answer>('');
  readonly verificationIssue = signal('');
  readonly termsReviewed = signal(false);
  readonly termsAgreed = signal(false);
  readonly submitted = signal(false);

  readonly declarationStatus = computed(() => answerStatus(this.declaration()));
  readonly verificationStatus = computed<TaskStatus>(() =>
    this.declarationStatus() === 'completed' ? answerStatus(this.verification()) : 'cannot-start',
  );
  readonly detailsConfirmed = computed(
    () => this.declarationStatus() === 'completed' && this.verificationStatus() === 'completed',
  );
  readonly termsStatus = computed<TaskStatus>(() => {
    if (this.submitted()) return 'completed';
    if (!this.detailsConfirmed()) return 'cannot-start';
    return this.termsAgreed() || this.termsReviewed() ? 'in-progress' : 'not-started';
  });

  readonly completedCount = computed(
    () =>
      [this.declarationStatus(), this.verificationStatus(), this.termsStatus()].filter(
        (s) => s === 'completed',
      ).length,
  );
}

// A "No" answer means the user has told us something is wrong; the task stays open until
// the record is corrected and they can confirm it.
function answerStatus(answer: Answer): TaskStatus {
  if (answer === 'yes') return 'completed';
  if (answer === 'no') return 'in-progress';
  return 'not-started';
}
