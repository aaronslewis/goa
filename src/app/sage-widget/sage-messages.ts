export type MessageKind = 'text' | 'typing' | 'list';

export interface SageMessage {
  id: number;
  role: 'bot' | 'user';
  kind: MessageKind;
  content: string | string[];
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
  { type: 'wait', ms: 1200 },
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
  { type: 'wait', ms: 500 },
  { type: 'replaceTypingWith', kind: 'text', content: 'What can I help you with?' },
];
