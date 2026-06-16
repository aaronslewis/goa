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

/** Greeting shown to a returning user — one is picked at random each visit so
 *  repeated demos stay fresh. */
export const RETURNING_GREETINGS = [
  'Hey, welcome back!',
  'Welcome back!',
  'Hi again!',
  'Good to see you!',
  'Great to see you again!',
];

/** Closing prompt for a returning user — also randomly rotated. */
export const RETURNING_PROMPTS = [
  'What can I help you with?',
  'What would you like to know?',
  'Ask me anything about the portal.',
  'What can I help you find today?',
];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** Suggestion-list content for a returning user — the same questions as the
 *  first-time intro. Shown only if the user stays idle (see the gated reveal in
 *  the widget), so it lives outside buildReturningScript. */
export const RETURNING_SUGGESTIONS: string[] = [
  'Here are a few questions I can help you answer:',
  'How do I update educator certifications?',
  'How do I change the Super Admin for my organization?',
  'Are there video tutorials on how to register children?',
];

/** A returning user already knows Sage, so the script drops the self-introduction
 *  and opens with a randomly-chosen welcome-back greeting followed by a prompt.
 *  Each message keeps its own paired timing. The suggestion list is NOT part of
 *  this script — it's revealed afterwards, gated on the user staying idle. */
export function buildReturningScript(): IntroStep[] {
  return [
    { type: 'wait', ms: 600 },
    { type: 'showTyping' },
    { type: 'wait', ms: 300 },
    { type: 'replaceTypingWith', kind: 'text', content: pick(RETURNING_GREETINGS) },

    { type: 'wait', ms: 600 },
    { type: 'showTyping' },
    { type: 'wait', ms: 1000 },
    { type: 'replaceTypingWith', kind: 'text', content: pick(RETURNING_PROMPTS) },
  ];
}
