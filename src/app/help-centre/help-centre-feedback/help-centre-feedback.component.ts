import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, computed, signal } from '@angular/core';

type FeedbackIntent = 'improve' | 'report' | 'like' | '';
type FeedbackStep = 1 | 2 | 3 | 4;

const OTHER_GUIDE_LABEL = 'General feedback about the Help Centre';

@Component({
  selector: 'help-centre-feedback',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './help-centre-feedback.component.html',
  styleUrl: './help-centre-feedback.component.scss',
})
export class HelpCentreFeedbackComponent {
  @Input() guideTitles: string[] = [];

  readonly otherGuideLabel = OTHER_GUIDE_LABEL;

  readonly isOpen = signal(false);
  readonly step = signal<FeedbackStep>(1);

  readonly intent = signal<FeedbackIntent>('');
  readonly comments = signal('');
  readonly name = signal('');
  readonly email = signal('');
  readonly programIdOrName = signal('');
  readonly selectedGuides = signal<Set<string>>(new Set());

  readonly commentsLabel = computed(() => {
    switch (this.intent()) {
      case 'improve':
        return 'How can we improve the guides for you?';
      case 'report':
        return 'What problem did you run into?';
      case 'like':
        return 'What do you like about the guides?';
      default:
        return 'Tell us more';
    }
  });

  readonly selectedGuidesValue = computed(() => Array.from(this.selectedGuides()));

  readonly canContinueFromContact = computed(
    () => this.name().trim().length > 0 && this.isValidEmail(this.email())
  );
  readonly canContinueFromIntent = computed(() => this.intent() !== '');
  readonly canSend = computed(() => this.comments().trim().length > 0);

  openModal(): void {
    this.step.set(1);
    this.intent.set('');
    this.comments.set('');
    this.name.set('');
    this.email.set('');
    this.programIdOrName.set('');
    this.selectedGuides.set(new Set());
    this.isOpen.set(true);
  }

  closeModal(): void {
    this.isOpen.set(false);
  }

  goToStep(step: FeedbackStep): void {
    this.step.set(step);
  }

  onIntentChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.intent.set((detail?.value as FeedbackIntent) ?? '');
  }

  onCommentsChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.comments.set(detail?.value ?? '');
  }

  onNameChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.name.set(detail?.value ?? '');
  }

  onEmailChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.email.set(detail?.value ?? '');
  }

  onProgramChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.programIdOrName.set(detail?.value ?? '');
  }

  onGuidesChange(event: Event): void {
    const detail = (event as CustomEvent<{ values: string[] }>).detail;
    this.selectedGuides.set(new Set((detail?.values ?? []).filter(Boolean)));
  }

  sendFeedback(): void {
    // Prototype only — there's no backend to send this to yet.
    this.step.set(4);
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }
}
