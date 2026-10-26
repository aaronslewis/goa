import { HubNotification, MessagePart, Program, Severity } from '../notifications-hub/notifications.data';

// The programs this provider (Sally) manages, as listed in the portal menu's
// Licensing group.
export const PROVIDER_PROGRAMS: Program[] = [
  { id: '80001234', name: 'Sunny Days Preschool' },
  { id: '80002817', name: 'Little Learners Academy' },
  { id: '80003390', name: 'Rainbow Kids Center' },
];

const PROGRAM_BY_ID = new Map(PROVIDER_PROGRAMS.map((p) => [p.id, p]));

interface Template {
  severity: Severity;
  title: string;
  message: (p: Program, who: string, detail: string) => MessagePart[];
  linkLabel: string;
}

const bold = (text: string): MessagePart => ({ text, bold: true });

// Provider-facing events: what happened to their own program, claims, funding
// and access. Staff-only events (licensing reviews, agency non-compliance) are
// deliberately absent.
const TEMPLATES = {
  grantReady: {
    severity: 'important',
    title: 'Affordability Grant agreement is ready to sign',
    message: (p) => [
      { text: 'Your 2027–2028 Affordability Grant agreement for ' },
      bold(p.name),
      { text: ' is ready to sign.' },
    ],
    linkLabel: 'Review and sign',
  },
  claimProcessed: {
    severity: 'information',
    title: 'Claim was processed',
    message: (p, _, month) => [{ text: `Your ${month} claim for ` }, bold(p.name), { text: ' has been processed.' }],
    linkLabel: 'View claim',
  },
  adjustmentApproved: {
    severity: 'information',
    title: 'Claim adjustment was approved',
    message: (p, _, month) => [
      { text: `Your ${month} claim adjustment for ` },
      bold(p.name),
      { text: ' has been approved.' },
    ],
    linkLabel: 'View adjustment',
  },
  incidentCreated: {
    severity: 'important',
    title: 'New incident report was created',
    message: (p, who) => [{ text: `${who} created a new incident report for ` }, bold(p.name), { text: '.' }],
    linkLabel: 'View incident report',
  },
  accessGranted: {
    severity: 'information',
    title: 'Someone was given access',
    message: (p, who, service) => [
      { text: `${who} now has access to ` },
      bold(p.name),
      { text: ` and the ${service} service.` },
    ],
    linkLabel: 'View user access',
  },
} satisfies Record<string, Template>;

type TemplateKey = keyof typeof TEMPLATES;

// [template, program, minutes ago, who, detail, dismissed, new]
type Row = [TemplateKey, string, number, string, string, boolean, boolean];

const DAY = 1440;

// Hand-written so the mock history is the same for every visitor. Today's items
// are new; most older ones are already completed.
const ROWS: Row[] = [
  ['grantReady', '80001234', 35, '', '', false, true],
  ['claimProcessed', '80002817', 140, '', 'September 2026', false, true],
  ['incidentCreated', '80003390', 200, 'Priya Sharma', '', false, false],
  ['adjustmentApproved', '80001234', DAY + 300, '', 'August 2026', false, false],
  ['accessGranted', '80002817', DAY + 520, 'Maria Gomez', 'Claims', false, false],
  ['grantReady', '80002817', 2 * DAY + 90, '', '', false, false],
  ['grantReady', '80003390', 2 * DAY + 95, '', '', false, false],
  ['claimProcessed', '80001234', 4 * DAY + 240, '', 'August 2026', true, false],
  ['incidentCreated', '80001234', 6 * DAY + 400, 'Jordan Blake', '', true, false],
  ['accessGranted', '80003390', 8 * DAY + 180, 'Omar Haddad', 'Child Registration', true, false],
  ['claimProcessed', '80002817', 11 * DAY + 60, '', 'August 2026', true, false],
  ['adjustmentApproved', '80003390', 13 * DAY + 330, '', 'July 2026', true, false],
  ['claimProcessed', '80003390', 18 * DAY + 450, '', 'July 2026', true, false],
  ['incidentCreated', '80002817', 24 * DAY + 120, 'Mei Chen', '', true, false],
  ['accessGranted', '80001234', 31 * DAY + 270, 'Liam Wong', 'Affordability Grant', true, false],
  ['claimProcessed', '80001234', 36 * DAY + 90, '', 'July 2026', true, false],
  ['adjustmentApproved', '80002817', 44 * DAY + 210, '', 'June 2026', true, false],
  ['claimProcessed', '80002817', 51 * DAY + 380, '', 'June 2026', true, false],
  ['incidentCreated', '80003390', 58 * DAY + 150, 'Sarah Tremblay', '', true, false],
  ['claimProcessed', '80003390', 66 * DAY + 70, '', 'June 2026', true, false],
];

function build(id: string, [key, programId, minsAgo, who, detail, dismissed, isNew]: Row, now: Date): HubNotification {
  const t: Template = TEMPLATES[key];
  const p = PROGRAM_BY_ID.get(programId)!;
  return {
    id,
    title: t.title,
    message: t.message(p, who, detail),
    linkLabel: t.linkLabel,
    severity: t.severity,
    programId,
    createdAt: new Date(now.getTime() - minsAgo * 60_000),
    dismissed,
    isNew,
  };
}

export function buildProviderNotifications(now = new Date()): HubNotification[] {
  return ROWS.map((row, i) => build(`pp-${i}`, row, now));
}

// Lands a few seconds after the page opens, so the prototype shows a live arrival.
export function providerArrival(now = new Date()): HubNotification {
  return build('pp-arrival', ['grantReady', '80003390', 0, '', '', false, true], now);
}
