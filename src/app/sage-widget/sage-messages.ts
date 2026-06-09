export type MessageKind = 'text' | 'typing' | 'list' | 'image';

/**
 * `dots`     — three pulsing dots only. Used during the intro sequence.
 * `thinking` — the word "Thinking" beside the dots. Used while Sage is
 *              processing a user-submitted question.
 */
export type TypingVariant = 'dots' | 'thinking';

export interface SageSource {
  label: string;
  url?: string;
}

export interface SageMessage {
  id: number;
  role: 'bot' | 'user';
  kind: MessageKind;
  content: string | string[];
  typingVariant?: TypingVariant;
  /** Inline image shown inside the text bubble, below the answer text. */
  image?: { src: string; alt: string };
  /** Kept for standalone image-only messages (kind: 'image'). */
  imageAlt?: string;
  sources?: SageSource[];
}

export type IntroStep =
  | { type: 'wait'; ms: number }
  | { type: 'showTyping' }
  | { type: 'replaceTypingWith'; kind: MessageKind; content: string | string[] };

export const INTRO_SCRIPT: IntroStep[] = [
  { type: 'wait', ms: 600 },
  { type: 'showTyping' },
  { type: 'wait', ms: 300 },
  { type: 'replaceTypingWith', kind: 'text', content: "Hi there! I'm Sage." },

  { type: 'wait', ms: 400 },
  { type: 'showTyping' },
  { type: 'wait', ms: 800 },
  {
    type: 'replaceTypingWith',
    kind: 'text',
    content: 'I can help you with questions about how to use the portal.',
  },

  { type: 'wait', ms: 500 },
  { type: 'showTyping' },
  // Hold the typing indicator noticeably longer before the suggestion list
  // lands — gives the user a beat to read the prior message before bullets appear.
  { type: 'wait', ms: 3100 },
  {
    type: 'replaceTypingWith',
    kind: 'list',
    content: [
      'Here are a few questions I can help you answer:',
      'How do I update educator certifications?',
      'How do I change the Super Admin for my organization?',
      'Are there video tutorials on how to register children?',
    ],
  },

  { type: 'wait', ms: 600 },
  { type: 'showTyping' },
  { type: 'wait', ms: 1000 },
  { type: 'replaceTypingWith', kind: 'text', content: 'What can I help you with?' },
];
