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
  // A function when the title carries a detail, such as days until expiry.
  title: string | ((detail: string) => string);
  // `who` is the person or child the event is about; `detail` is event-specific
  // (a month, service, funding category, age or days); `at` is when it was created.
  message: (p: Program, who: string, detail: string, at: Date) => MessagePart[];
  linkLabel: string;
}

const bold = (text: string): MessagePart => ({ text, bold: true });

const longDate = (d: Date) => d.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });
const inDays = (at: Date, days: string) => new Date(at.getTime() + Number(days) * 864e5);

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
  // Child registration: parents confirm to the ministry that the child is theirs
  // and registered properly, so each event keeps the provider, the ministry and
  // the parent in step.
  fundingApproved: {
    severity: 'information',
    title: 'Parent funding application was approved',
    message: (p, child, category) => [
      { text: `The funding application for ${child} at ` },
      bold(p.name),
      { text: ` was approved and assigned to ${category}. The registration now shows what the family is eligible for.` },
    ],
    linkLabel: 'View registration',
  },
  parentRegistration: {
    severity: 'important',
    title: 'Parent-led registration needs your attention',
    message: (p, child) => [
      { text: `A parent registered ${child} at ` },
      bold(p.name),
      { text: '. Confirm the child attends your program.' },
    ],
    linkLabel: 'Review registration',
  },
  agingOut: {
    severity: 'important',
    title: 'Child is aging out of your program',
    message: (p, child, age, at) => [
      { text: `${child} turns ${age} on ${longDate(inDays(at, '30'))} and is aging out of ` },
      bold(p.name),
      { text: '. Check whether the registration needs to change.' },
    ],
    linkLabel: 'View registration',
  },
  specialNeedsExpiring: {
    severity: 'important',
    title: (days) => `Special needs status expires in ${days} days`,
    message: (p, child, days, at) => [
      { text: `The special needs status for ${child} at ` },
      bold(p.name),
      { text: ` expires on ${longDate(inDays(at, days))}. Update it before then to keep the status.` },
    ],
    linkLabel: 'View registration',
  },
  fundingExpiring: {
    severity: 'important',
    title: (days) => `Funding expires in ${days} days`,
    message: (p, child, days, at) => [
      { text: `Funding for ${child} at ` },
      bold(p.name),
      { text: ` expires on ${longDate(inDays(at, days))}. Submit a renewal to keep it.` },
    ],
    linkLabel: 'Submit renewal',
  },
  fundingExpiringSoon: {
    severity: 'urgent',
    title: (days) => `Funding expires in ${days} days`,
    message: (p, child, days, at) => [
      { text: `Funding for ${child} at ` },
      bold(p.name),
      { text: ` expires on ${longDate(inDays(at, days))}. Submit a renewal now to avoid a gap in funding.` },
    ],
    linkLabel: 'Submit renewal',
  },
  registeredElsewhere: {
    severity: 'important',
    title: 'Child is also registered at another program',
    message: (p, child) => [
      { text: `${child}, registered at ` },
      bold(p.name),
      { text: ', has also been registered at another program. End a registration or change the funding allocation.' },
    ],
    linkLabel: 'Review registration',
  },
  registrationDeleted: {
    severity: 'information',
    title: 'Registration was deleted by the ministry',
    message: (p, child) => [
      { text: `A ministry administrator deleted the registration for ${child} at ` },
      bold(p.name),
      { text: '. It no longer appears in your registration list.' },
    ],
    linkLabel: 'View registration list',
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

  // Child registration events.
  ['parentRegistration', '80002817', 75, 'Noor A.', '', false, true],
  ['fundingApproved', '80001234', 160, 'Ayla M.', 'Category 2', false, true],
  ['registeredElsewhere', '80003390', DAY + 120, 'Theo L.', '', false, false],
  ['fundingExpiringSoon', '80002817', DAY + 600, 'Mateo R.', '7', false, false],
  ['specialNeedsExpiring', '80001234', 2 * DAY + 200, 'Isla K.', '45', false, false],
  ['agingOut', '80003390', 3 * DAY + 100, 'Owen P.', '6', false, false],
  ['fundingExpiring', '80001234', 5 * DAY + 300, 'Zara H.', '52', false, false],
  ['registrationDeleted', '80002817', 7 * DAY + 250, 'Liam C.', '', false, false],
  ['parentRegistration', '80001234', 9 * DAY + 180, 'Amira S.', '', true, false],
  ['fundingApproved', '80003390', 12 * DAY + 90, 'Noah B.', 'Category 1', true, false],
  ['agingOut', '80002817', 20 * DAY + 300, 'Chloe D.', '5', true, false],
  ['registeredElsewhere', '80001234', 27 * DAY + 60, 'Jonah F.', '', true, false],
  ['specialNeedsExpiring', '80003390', 33 * DAY + 500, 'Eli T.', '58', true, false],
  ['registrationDeleted', '80003390', 41 * DAY + 220, 'Sofia G.', '', true, false],
  ['fundingExpiring', '80002817', 49 * DAY + 140, 'Kai W.', '40', true, false],
  ['fundingApproved', '80002817', 55 * DAY + 100, 'Maya N.', 'Category 2', true, false],
];

function build(id: string, [key, programId, minsAgo, who, detail, dismissed, isNew]: Row, now: Date): HubNotification {
  const t: Template = TEMPLATES[key];
  const p = PROGRAM_BY_ID.get(programId)!;
  const createdAt = new Date(now.getTime() - minsAgo * 60_000);
  return {
    id,
    title: typeof t.title === 'string' ? t.title : t.title(detail),
    message: t.message(p, who, detail, createdAt),
    linkLabel: t.linkLabel,
    severity: t.severity,
    programId,
    createdAt,
    dismissed,
    isNew,
  };
}

export function buildProviderNotifications(now = new Date()): HubNotification[] {
  return ROWS.map((row, i) => build(`pp-${i}`, row, now)).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

// Lands a few seconds after the page opens, so the prototype shows a live arrival.
export function providerArrival(now = new Date()): HubNotification {
  return build('pp-arrival', ['grantReady', '80003390', 0, '', '', false, true], now);
}
