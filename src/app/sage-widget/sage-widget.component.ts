import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
  computed,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { OWL_SVG } from './owl.svg';
import { INTRO_SCRIPT, SageMessage, SageSource, MessageKind, TypingVariant } from './sage-messages';

type ExpandState = 'compact' | 'wide';

const NEXT_EXPAND: Record<ExpandState, ExpandState> = {
  compact: 'wide',
  wide: 'compact',
};

type TextSize = 'normal' | 'large' | 'xlarge';

const NEXT_TEXT_SIZE: Record<TextSize, TextSize> = {
  normal: 'large',
  large: 'xlarge',
  xlarge: 'normal',
};

type PeekState = 'hidden' | 'visible' | 'leaving';

@Component({
  selector: 'sage-widget',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sage-widget.component.html',
  styleUrl: './sage-widget.component.scss',
})
export class SageWidgetComponent implements OnInit, OnDestroy {
  readonly owlSvg: SafeHtml;

  private readonly sageInput = viewChild<ElementRef<HTMLTextAreaElement>>('sageInput');

  /** Time Sage 'thinks' (typing dots) before replying, in ms. */
  private readonly THINKING_MS = 5000;

  /** How long the user must be inactive before the "Need help?" peek surfaces. */
  private readonly IDLE_MS = 7000;

  /** Delay after load before the owl plays its one-time attention pulse. */
  private readonly OWL_PULSE_DELAY_MS = 2500;

  /** How long the pulse class stays applied (slightly longer than the CSS
   *  animation so it completes before the class is removed). */
  private readonly OWL_PULSE_DURATION_MS = 1500;

  /** Pause after activity before the peek begins fading out — gives the user a beat. */
  private readonly PEEK_HIDE_DELAY_MS = 150;

  /** Duration of the peek's fade-out animation; must match the CSS keyframe. */
  private readonly PEEK_FADE_OUT_MS = 220;

  /** Page-level interactions that count as "engaging with the page".
   *  Intentionally excludes scroll — passively scanning the page by scrolling
   *  shouldn't suppress the peek. Mouse clicks cover desktop + mobile taps
   *  (browsers fire a synthetic click on tap), and keydown covers typing and
   *  Tab-based keyboard navigation. */
  private readonly ACTIVITY_EVENTS = ['click', 'keydown'] as const;

  readonly isOpen = signal(false);
  readonly expandState = signal<ExpandState>('compact');
  readonly textSize = signal<TextSize>('normal');
  // Surface the peek immediately on page load. From there the standard
  // activity-driven hide / idle-driven re-show cycle takes over.
  readonly peekState = signal<PeekState>('visible');
  readonly isPeekRendered = computed(() => this.peekState() !== 'hidden');
  readonly isPeekLeaving = computed(() => this.peekState() === 'leaving');
  readonly owlPulse = signal(false);
  readonly messages = signal<SageMessage[]>([]);
  readonly hasPlayedIntro = signal(false);
  readonly draft = signal('');
  readonly lightboxSrc = signal<string | null>(null);
  readonly lightboxAlt = signal<string>('');

  readonly widthPx = computed(() => (this.expandState() === 'wide' ? '492px' : '360px'));

  readonly isWide = computed(() => this.expandState() === 'wide');

  /** Id of the most recent bot message — the only row that shows the owl avatar.
   *  As Sage adds messages the avatar "drops down" to the newest bot bubble. */
  readonly lastBotId = computed(() => {
    const list = this.messages();
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].role === 'bot') return list[i].id;
    }
    return null;
  });

  readonly fontSizePx = computed(() => {
    switch (this.textSize()) {
      case 'xlarge': return '20px';
      case 'large': return '17px';
      default: return '14px';
    }
  });

  readonly textSizeTitle = computed(() => {
    switch (this.textSize()) {
      case 'normal': return 'Increase text size';
      case 'large': return 'Increase text size';
      case 'xlarge': return 'Reset text size';
    }
  });

  private pendingTimer: ReturnType<typeof setTimeout> | null = null;
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private peekHideTimer: ReturnType<typeof setTimeout> | null = null;
  private peekRemoveTimer: ReturnType<typeof setTimeout> | null = null;
  private owlPulseStartTimer: ReturnType<typeof setTimeout> | null = null;
  private owlPulseEndTimer: ReturnType<typeof setTimeout> | null = null;
  private nextId = 1;
  private cannedIndex = 0;
  private cancelled = false;

  private readonly onActivity = (): void => {
    // Any page interaction queues the peek to fade out (with a brief delay
    // so the dismissal feels intentional) and resets the idle countdown.
    if (this.peekState() === 'visible') {
      this.beginHidePeek();
    }
    this.scheduleIdle();
  };

  private beginHidePeek(): void {
    // Don't restart the cycle if a fade is already in flight.
    if (this.peekHideTimer !== null || this.peekRemoveTimer !== null) return;
    this.peekHideTimer = setTimeout(() => {
      this.peekHideTimer = null;
      this.peekState.set('leaving');
      this.peekRemoveTimer = setTimeout(() => {
        this.peekRemoveTimer = null;
        // Guard against a re-show that landed during the fade — only finalize
        // to hidden if we're still in the leaving phase.
        if (this.peekState() === 'leaving') this.peekState.set('hidden');
      }, this.PEEK_FADE_OUT_MS);
    }, this.PEEK_HIDE_DELAY_MS);
  }

  private cancelPeekHideTimers(): void {
    if (this.peekHideTimer !== null) {
      clearTimeout(this.peekHideTimer);
      this.peekHideTimer = null;
    }
    if (this.peekRemoveTimer !== null) {
      clearTimeout(this.peekRemoveTimer);
      this.peekRemoveTimer = null;
    }
  }

  private readonly cannedResponses: Array<{ text: string; image?: { src: string; alt: string }; sources?: SageSource[] }> = [
    {
      text: 'To register a child, navigate to the Children tab and click "Add Child". Fill in the required fields, then click Save. Here is a screenshot of the registration form:',
      image: {
        src: 'https://placehold.co/800x500/e8f4fd/0070C4?text=Child+Registration+Form',
        alt: 'Screenshot of the child registration form showing required fields',
      },
      sources: [
        { label: 'Child Registration User Guide.pdf', url: '#' },
        { label: 'Help Centre – Child Registration', url: '#' },
      ],
    },
    {
      text: 'To enter a claim adjustment, log in to the Child Care Licensing Portal. Tiles for available services (such as the claim adjustment service) can be accessed below your program list. Click "Submit adjustments" to enter adjustments — a list of programs you have access to will appear. You can also select "Claims" and then "Submit Adjustment" from the left-hand navigation menu.',
      sources: [
        { label: 'Child Care Licensing Portal Claim Adjustments Operator User Guide.pdf', url: '#' },
      ],
    },
    {
      text: 'To change the Super Admin for your organization, navigate to Access > User Access Management. Select the current Super Admin and choose "Transfer Super Admin role". The new Super Admin will receive an email invitation to accept the role.',
      sources: [
        { label: 'User Access Management Guide.pdf', url: '#' },
      ],
    },
  ];

  constructor(sanitizer: DomSanitizer) {
    this.owlSvg = sanitizer.bypassSecurityTrustHtml(OWL_SVG);
  }

  ngOnInit(): void {
    if (typeof document === 'undefined') return;
    for (const ev of this.ACTIVITY_EVENTS) {
      // Capture phase so we hear interactions before they get handled / stopPropagation'd.
      document.addEventListener(ev, this.onActivity, { passive: true, capture: true });
    }
    this.scheduleIdle();

    // One-time attention pulse on the owl ~3s after the page loads.
    this.owlPulseStartTimer = setTimeout(() => {
      this.owlPulseStartTimer = null;
      this.owlPulse.set(true);
      this.owlPulseEndTimer = setTimeout(() => {
        this.owlPulseEndTimer = null;
        this.owlPulse.set(false);
      }, this.OWL_PULSE_DURATION_MS);
    }, this.OWL_PULSE_DELAY_MS);
  }

  ngOnDestroy(): void {
    this.cancelTimers();
    this.cancelPeekHideTimers();
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.owlPulseStartTimer !== null) {
      clearTimeout(this.owlPulseStartTimer);
      this.owlPulseStartTimer = null;
    }
    if (this.owlPulseEndTimer !== null) {
      clearTimeout(this.owlPulseEndTimer);
      this.owlPulseEndTimer = null;
    }
    if (typeof document !== 'undefined') {
      for (const ev of this.ACTIVITY_EVENTS) {
        document.removeEventListener(ev, this.onActivity, { capture: true } as EventListenerOptions);
      }
    }
  }

  private scheduleIdle(): void {
    if (this.idleTimer !== null) clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.idleTimer = null;
      // Only surface the peek when the panel is collapsed.
      if (!this.isOpen()) {
        this.cancelPeekHideTimers();
        this.peekState.set('visible');
      }
    }, this.IDLE_MS);
  }

  openPanel(): void {
    if (this.isOpen()) return;
    this.isOpen.set(true);
    this.cancelPeekHideTimers();
    this.peekState.set('hidden');
    if (!this.hasPlayedIntro()) {
      this.runIntro();
    }
  }

  closePanel(): void {
    this.isOpen.set(false);
    this.cancelPeekHideTimers();
    this.peekState.set('hidden');
    this.scheduleIdle();
  }

  resetAndReplay(): void {
    this.cancelTimers();
    this.messages.set([]);
    this.hasPlayedIntro.set(false);
    if (this.isOpen()) {
      this.runIntro();
    } else {
      this.openPanel();
    }
  }

  cycleExpand(): void {
    this.expandState.update(s => NEXT_EXPAND[s]);
  }

  /** Hovering the owl (or the peek beside it) surfaces the "Need help?" prompt. */
  onTriggerEnter(): void {
    if (this.isOpen()) return;
    this.cancelPeekHideTimers();
    this.peekState.set('visible');
  }

  /** Leaving the trigger area fades the peek back out (idle logic still applies). */
  onTriggerLeave(): void {
    if (this.isOpen()) return;
    if (this.peekState() === 'visible') this.beginHidePeek();
  }

  cycleTextSize(): void {
    this.textSize.update(s => NEXT_TEXT_SIZE[s]);
    // Recompute textarea height since font size changed.
    setTimeout(() => {
      const ta = this.sageInput()?.nativeElement;
      if (ta) this.autoResize(ta);
    }, 0);
  }

  onTextareaInput(event: Event): void {
    const ta = event.target as HTMLTextAreaElement;
    this.draft.set(ta.value);
    this.autoResize(ta);
  }

  onTextareaKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }

  askSuggestion(text: string): void {
    // Clicking a suggested prompt posts it straight away as a user message —
    // submit() reads the draft synchronously, so setting it then submitting
    // sends it without waiting for the textarea to re-render.
    this.draft.set(text);
    this.submit();
  }

  private autoResize(ta: HTMLTextAreaElement): void {
    ta.style.height = 'auto';
    const cs = window.getComputedStyle(ta);
    const lineHeight = parseFloat(cs.lineHeight) || 20;
    const padTop = parseFloat(cs.paddingTop) || 0;
    const padBot = parseFloat(cs.paddingBottom) || 0;
    const borderTop = parseFloat(cs.borderTopWidth) || 0;
    const borderBot = parseFloat(cs.borderBottomWidth) || 0;
    const maxHeight = lineHeight * 2 + padTop + padBot + borderTop + borderBot;
    const desired = ta.scrollHeight + borderTop + borderBot;
    const next = Math.min(desired, maxHeight);
    ta.style.height = `${next}px`;
    ta.style.overflowY = desired > maxHeight ? 'auto' : 'hidden';
  }

  async submit(): Promise<void> {
    const text = this.draft().trim();
    if (!text) return;

    this.cancelTimers();
    this.cancelled = false;
    this.hasPlayedIntro.set(true);

    this.messages.update(list => [
      ...list.filter(m => m.kind !== 'typing'),
      { id: this.nextId++, role: 'user', kind: 'text', content: text },
    ]);
    this.draft.set('');
    // Reset textarea height after clearing.
    setTimeout(() => {
      const ta = this.sageInput()?.nativeElement;
      if (ta) this.autoResize(ta);
    }, 0);

    await this.sleep(450);
    if (this.cancelled) return;

    this.pushTyping('thinking');
    await this.sleep(this.THINKING_MS);
    if (this.cancelled) return;

    const response = this.cannedResponses[this.cannedIndex % this.cannedResponses.length];
    this.cannedIndex++;
    this.replaceTyping('text', response.text, response.sources, response.image);
  }

  trackById(_: number, m: SageMessage) {
    return m.id;
  }

  private async runIntro(): Promise<void> {
    this.cancelled = false;
    for (const step of INTRO_SCRIPT) {
      if (this.cancelled) return;
      if (step.type === 'wait') {
        await this.sleep(step.ms);
      } else if (step.type === 'showTyping') {
        this.pushTyping();
      } else if (step.type === 'replaceTypingWith') {
        this.replaceTyping(step.kind, step.content);
      }
    }
    this.hasPlayedIntro.set(true);
  }

  private pushTyping(variant: TypingVariant = 'dots'): void {
    this.messages.update(list => [
      ...list,
      { id: this.nextId++, role: 'bot', kind: 'typing', content: '', typingVariant: variant },
    ]);
  }

  private replaceTyping(
    kind: MessageKind,
    content: string | string[],
    sources?: SageSource[],
    image?: { src: string; alt: string },
  ): void {
    this.messages.update(list => {
      const idx = list.findIndex(m => m.kind === 'typing');
      const replaced: SageMessage = {
        id: idx >= 0 ? list[idx].id : this.nextId++,
        role: 'bot',
        kind,
        content,
        ...(sources?.length ? { sources } : {}),
        ...(image ? { image } : {}),
      };
      if (idx < 0) return [...list, replaced];
      const out = list.slice();
      out[idx] = replaced;
      return out;
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
      this.pendingTimer = setTimeout(() => {
        this.pendingTimer = null;
        resolve();
      }, ms);
    });
  }

  private cancelTimers(): void {
    this.cancelled = true;
    if (this.pendingTimer !== null) {
      clearTimeout(this.pendingTimer);
      this.pendingTimer = null;
    }
  }

  asString(m: SageMessage): string {
    return typeof m.content === 'string' ? m.content : '';
  }

  asList(m: SageMessage): string[] {
    return Array.isArray(m.content) ? m.content : [];
  }

  openLightbox(src: string, alt: string): void {
    this.lightboxSrc.set(src);
    this.lightboxAlt.set(alt);
  }

  closeLightbox(): void {
    this.lightboxSrc.set(null);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.lightboxSrc()) this.closeLightbox();
  }
}
