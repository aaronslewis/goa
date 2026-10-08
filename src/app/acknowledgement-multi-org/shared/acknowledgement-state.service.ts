import { Injectable, computed, signal } from '@angular/core';
import { ORGANIZATIONS, Organization } from './acknowledgement-data';

export type Answer = '' | 'yes' | 'no';

export type TaskStatus = 'completed' | 'in-progress' | 'not-started' | 'cannot-start';

// Lives at root so answers survive moving between the task list and its question pages.
// The step answers belong to the organization in progress; they reset when the provider
// moves on to the next one.
@Injectable({ providedIn: 'root' })
export class AckMultiOrgStateService {
  readonly organizations = ORGANIZATIONS;
  readonly completedOrgIds = signal<string[]>([]);
  readonly completedOn = signal<Record<string, Date>>({});
  readonly currentOrgId = signal(ORGANIZATIONS[0].id);

  readonly declaration = signal<Answer>('');
  readonly declarationIssue = signal('');
  readonly verification = signal<Answer>('');
  readonly verificationIssue = signal('');
  readonly termsReviewed = signal(false);
  readonly termsAgreed = signal(false);
  readonly submitted = signal(false);

  readonly currentOrg = computed(() => ORGANIZATIONS.find((o) => o.id === this.currentOrgId())!);
  readonly remainingOrgs = computed(() => ORGANIZATIONS.filter((o) => !this.isCompleted(o)));
  readonly allDone = computed(() => this.remainingOrgs().length === 0);

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

  isCompleted(org: Organization): boolean {
    return this.completedOrgIds().includes(org.id);
  }

  // Switching organization part-way through starts its steps again: answers given for one
  // organization don't carry over to another.
  selectOrg(id: string): void {
    if (id === this.currentOrgId()) return;
    this.currentOrgId.set(id);
    this.resetSteps();
  }

  submit(): void {
    this.submitted.set(true);
    const id = this.currentOrgId();
    this.completedOrgIds.update((ids) => [...ids, id]);
    this.completedOn.update((dates) => ({ ...dates, [id]: new Date() }));
  }

  startNextOrg(): void {
    const next = this.remainingOrgs()[0];
    if (!next) return;
    this.currentOrgId.set(next.id);
    this.resetSteps();
  }

  private resetSteps(): void {
    this.declaration.set('');
    this.declarationIssue.set('');
    this.verification.set('');
    this.verificationIssue.set('');
    this.termsReviewed.set(false);
    this.termsAgreed.set(false);
    this.submitted.set(false);
  }
}

// A "No" answer means the user has told us something is wrong; the task stays open until
// the record is corrected and they can confirm it.
function answerStatus(answer: Answer): TaskStatus {
  if (answer === 'yes') return 'completed';
  if (answer === 'no') return 'in-progress';
  return 'not-started';
}
