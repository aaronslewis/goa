import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  signal,
  computed,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { OWL_SVG } from './owl.svg';
import { INTRO_SCRIPT, SageMessage, MessageKind, TypingVariant } from './sage-messages';

type ExpandState = 'compact' | 'wide' | 'full';

const NEXT_EXPAND: Record<ExpandState, ExpandState> = {
  compact: 'wide',
  wide: 'full',
  full: 'compact',
};

type TextSize = 'normal' | 'large' | 'xlarge';

const NEXT_TEXT_SIZE: Record<TextSize, TextSize> = {
  normal: 'large',
  large: 'xlarge',
  xlarge: 'normal',
};

@Component({
  selector: 'sage-widget',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sage-widget.component.html',
  styleUrl: './sage-widget.component.scss',
})
export class SageWidgetComponent implements OnDestroy {
  readonly owlSvg: SafeHtml;

  private readonly sageInput = viewChild<ElementRef<HTMLTextAreaElement>>('sageInput');

  /** Time Sage 'thinks' (typing dots) before replying, in ms. */
  private readonly THINKING_MS = 5000;

  readonly isOpen = signal(false);
  readonly expandState = signal<ExpandState>('compact');
  readonly textSize = signal<TextSize>('normal');
  readonly messages = signal<SageMessage[]>([]);
  readonly hasPlayedIntro = signal(false);
  readonly draft = signal('');

  readonly widthPx = computed(() => {
    const s = this.expandState();
    if (s === 'full') return '100%';
    if (s === 'wide') return '492px';
    return '360px';
  });

  readonly isFullScreen = computed(() => this.expandState() === 'full');

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
  private nextId = 1;
  private cancelled = false;

  private readonly cannedResponses = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    "Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Nunc sed mauris erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue, sed non.",
    "Curabitur blandit tempus porttitor. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non.",
  ];

  constructor(sanitizer: DomSanitizer) {
    this.owlSvg = sanitizer.bypassSecurityTrustHtml(OWL_SVG);
  }

  ngOnDestroy(): void {
    this.cancelTimers();
  }

  openPanel(): void {
    if (this.isOpen()) return;
    this.isOpen.set(true);
    if (!this.hasPlayedIntro()) {
      this.runIntro();
    }
  }

  closePanel(): void {
    this.isOpen.set(false);
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
    this.draft.set(text);
    // Defer focus + resize so the new value has propagated to the textarea.
    setTimeout(() => {
      const ta = this.sageInput()?.nativeElement;
      if (!ta) return;
      this.focusInput();
      this.autoResize(ta);
    }, 0);
  }

  private focusInput(): void {
    const ta = this.sageInput()?.nativeElement;
    if (!ta) return;
    ta.focus();
    const end = ta.value?.length ?? 0;
    try {
      ta.setSelectionRange(end, end);
    } catch {
      // ignore
    }
  }

  private autoResize(ta: HTMLTextAreaElement): void {
    ta.style.height = 'auto';
    const cs = window.getComputedStyle(ta);
    const lineHeight = parseFloat(cs.lineHeight) || 20;
    const padTop = parseFloat(cs.paddingTop) || 0;
    const padBot = parseFloat(cs.paddingBottom) || 0;
    const borderTop = parseFloat(cs.borderTopWidth) || 0;
    const borderBot = parseFloat(cs.borderBottomWidth) || 0;
    const maxHeight = lineHeight * 3 + padTop + padBot + borderTop + borderBot;
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

    const reply = this.cannedResponses[
      Math.floor(Math.random() * this.cannedResponses.length)
    ];
    this.replaceTyping('text', reply);
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

  private replaceTyping(kind: MessageKind, content: string | string[]): void {
    this.messages.update(list => {
      const idx = list.findIndex(m => m.kind === 'typing');
      const replaced: SageMessage = {
        id: idx >= 0 ? list[idx].id : this.nextId++,
        role: 'bot',
        kind,
        content,
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
}
