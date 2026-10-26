import { HubNotification, MessagePart, Program, Severity } from '../notifications-hub/notifications.data';

// The hub's notification feed filters by `Program`; here that slot holds who a
// notification is about: the parent (Jasmine) or one of her children.
export const FAMILY_SUBJECTS: Program[] = [
  { id: 'parent', name: 'Me' },
  { id: 'ayla', name: 'Ayla' },
  { id: 'noor', name: 'Noor' },
  { id: 'theo', name: 'Theo' },
];

const SUBJECT_BY_ID = new Map(FAMILY_SUBJECTS.map((s) => [s.id, s]));

interface Template {
  severity: Severity;
  // A function when the title carries the child's name or a detail, such as days until expiry.
  title: string | ((child: string, detail: string) => string);
  // `c` is who it is about (a child, or "Me" for the parent); `who` is the other
  // party (a program, the other parent or a document); `detail` is event-specific
  // (days, a grade, a funding category); `at` is when it was created.
  message: (c: Program, who: string, detail: string, at: Date) => MessagePart[];
  linkLabel: string;
}

const bold = (text: string): MessagePart => ({ text, bold: true });

const longDate = (d: Date) => d.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });
const inDays = (at: Date, days: string) => new Date(at.getTime() + Number(days) * 864e5);

// Parent-facing events from the family portal's notification ideas. Operators
// and the ministry act on a registration; the parent confirms, uploads or
// checks. Copy is plain language, one next step per notification.
const TEMPLATES = {
  // Registration: operator-led registrations wait for the parent to confirm.
  confirmRegistration: {
    severity: 'important',
    title: (child) => `Confirm ${child}’s registration`,
    message: (c, program) => [
      bold(program),
      { text: ` registered ${c.name} for child care. Confirm that ${c.name} attends before the registration can be used.` },
    ],
    linkLabel: 'Review and confirm',
  },
  confirmReminder: {
    severity: 'urgent',
    title: (child) => `Reminder: confirm ${child}’s registration`,
    message: (c, program) => [
      { text: `You have not confirmed the registration for ${c.name} at ` },
      bold(program),
      { text: '. Confirm it so funding is not delayed.' },
    ],
    linkLabel: 'Review and confirm',
  },
  registrationAccepted: {
    severity: 'information',
    title: 'Registration was accepted',
    message: (c, program) => [
      bold(program),
      { text: ` accepted your registration for ${c.name}.` },
    ],
    linkLabel: 'View registration',
  },
  registrationRejected: {
    severity: 'important',
    title: 'Registration was not accepted',
    message: (c, program) => [
      bold(program),
      { text: ` did not accept your registration for ${c.name}. Contact the program or register at a different one.` },
    ],
    linkLabel: 'View registration',
  },
  registrationChanged: {
    severity: 'information',
    title: 'Registration was changed',
    message: (c, program, change) => [
      bold(program),
      { text: ` changed ${c.name}’s registration: ${change}.` },
    ],
    linkLabel: 'View registration',
  },
  startDateAdded: {
    severity: 'information',
    title: 'Program start date was added',
    message: (c, program, date) => [
      bold(program),
      { text: ` accepted the registration for ${c.name} and set the start date to ${date}.` },
    ],
    linkLabel: 'View registration',
  },
  registrationDeleted: {
    severity: 'information',
    title: 'Registration was deleted by the ministry',
    message: (c, program) => [
      { text: `A ministry administrator deleted the registration for ${c.name} at ` },
      bold(program),
      { text: '. If this is wrong, contact the ministry.' },
    ],
    linkLabel: 'View registrations',
  },
  suspectedDuplicate: {
    severity: 'important',
    title: 'Possible duplicate registration',
    message: (c, program) => [
      { text: `${c.name} may be registered twice: at ` },
      bold(program),
      { text: ' and at another program. Check which registration is correct.' },
    ],
    linkLabel: 'Review registrations',
  },
  duplicateMerged: {
    severity: 'information',
    title: 'Duplicate registrations were merged',
    message: (c) => [{ text: `The duplicate registrations for ${c.name} were merged into one.` }],
    linkLabel: 'View registration',
  },

  // Funding and subsidy.
  fundingApproved: {
    severity: 'information',
    title: 'Funding application was approved',
    message: (c, _, category) => [
      { text: `The funding application for ${c.name} was approved and assigned to ${category}.` },
    ],
    linkLabel: 'View funding',
  },
  fundingExpiring: {
    severity: 'important',
    title: (_, days) => `Funding ends in ${days} days`,
    message: (c, _, days, at) => [
      { text: `Funding for ${c.name} ends on ${longDate(inDays(at, days))}. Renew it to keep it.` },
    ],
    linkLabel: 'Renew funding',
  },
  fundingExpiringSoon: {
    severity: 'urgent',
    title: (_, days) => `Funding ends in ${days} days`,
    message: (c, _, days, at) => [
      { text: `Funding for ${c.name} ends on ${longDate(inDays(at, days))}. Renew now to avoid a gap in funding.` },
    ],
    linkLabel: 'Renew funding',
  },
  specialNeedsExpiring: {
    severity: 'important',
    title: (_, days) => `Special needs status ends in ${days} days`,
    message: (c, _, days, at) => [
      { text: `The special needs status for ${c.name} ends on ${longDate(inDays(at, days))}. Update it before then to keep the status.` },
    ],
    linkLabel: 'Update status',
  },
  subsidyAttention: {
    severity: 'important',
    title: 'Your subsidy application needs attention',
    message: (c, document) => [
      { text: `The subsidy application for ${c.name} is missing ` },
      bold(document),
      { text: '. Upload it so the application can move forward.' },
    ],
    linkLabel: 'Upload document',
  },
  documentsRequired: {
    severity: 'important',
    title: 'More documents are needed',
    message: (c, document) => [
      { text: `You submitted the application for ${c.name} without ` },
      bold(document),
      { text: '. Upload it so the application can be processed.' },
    ],
    linkLabel: 'Upload document',
  },
  applicationSubmitted: {
    severity: 'information',
    title: 'Application was submitted',
    message: (c) => [{ text: `We received your application for ${c.name}. We will let you know when it is reviewed.` }],
    linkLabel: 'View application',
  },
  applicationReviewed: {
    severity: 'information',
    title: 'Application is being reviewed',
    message: (c) => [{ text: `A reviewer started on your application for ${c.name}.` }],
    linkLabel: 'View application',
  },
  applicationApproved: {
    severity: 'information',
    title: 'Application was approved',
    message: (c) => [{ text: `Your application for ${c.name} was approved.` }],
    linkLabel: 'View application',
  },
  applicationDenied: {
    severity: 'important',
    title: 'Application was denied',
    message: (c, reason) => [
      { text: `Your application for ${c.name} was denied: ${reason}. You can apply again or ask for a review.` },
    ],
    linkLabel: 'View decision',
  },
  waitingOnCoApplicant: {
    severity: 'information',
    title: 'Waiting on your co-applicant',
    message: (c, other) => [
      { text: `The application for ${c.name} cannot move forward until ` },
      bold(other),
      { text: ' completes their part.' },
    ],
    linkLabel: 'View application',
  },
  coApplicantCompleted: {
    severity: 'information',
    title: 'Your co-applicant completed their part',
    message: (c, other) => [
      bold(other),
      { text: ` completed their part of the application for ${c.name}.` },
    ],
    linkLabel: 'View application',
  },

  // Profile and household.
  confirmInformation: {
    severity: 'important',
    title: 'Check the information we have on file',
    message: (c) => [
      { text: c.id === 'parent' ? 'Check that your contact and household details are correct.' : `Check that the details we have for ${c.name} are correct.` },
    ],
    linkLabel: 'Check information',
  },
  profileUpdated: {
    severity: 'information',
    title: (_, who) => (who === 'child' ? 'A child’s profile was updated' : 'Your profile was updated'),
    message: (c, _, kind) => [
      { text: kind === 'child' ? `The profile for ${c.name} was updated.` : 'Your profile was updated.' },
      { text: ' If you did not expect this change, contact the ministry.' },
    ],
    linkLabel: 'View profile',
  },
  gradeUpdated: {
    severity: 'information',
    title: 'Grade was updated for the new school year',
    message: (c, _, grade) => [{ text: `${c.name}’s grade changed to ${grade}.` }],
    linkLabel: 'View profile',
  },
  schoolYearStarting: {
    severity: 'information',
    title: 'The school year starts soon',
    message: (_, __, date) => [
      { text: `School starts on ${date}. Check that your children’s registrations and funding are up to date.` },
    ],
    linkLabel: 'View children',
  },
  agingOut: {
    severity: 'important',
    title: (child) => `${child} is aging out of the program`,
    message: (c, _, age, at) => [
      { text: `${c.name} turns ${age} on ${longDate(inDays(at, '30'))}. Check whether the registration or funding needs to change.` },
    ],
    linkLabel: 'View registration',
  },
  secondParentAdded: {
    severity: 'information',
    title: 'A second parent now has access',
    message: (c, parent) => [
      bold(parent),
      { text: ` was given access to ${c.name}’s profile. You can manage who has access.` },
    ],
    linkLabel: 'Manage access',
  },
  childRemoved: {
    severity: 'information',
    title: 'A child was removed from your household',
    message: (c) => [
      { text: `${c.name} was removed from your household. If this is wrong, contact the ministry.` },
    ],
    linkLabel: 'View children',
  },

  // Licensing and quality. Parents hear from the ministry directly; inspections
  // are a future feature.
  qualityConcern: {
    severity: 'important',
    title: 'Update about your child’s program',
    message: (c, program) => [
      { text: `The ministry has information about ` },
      bold(program),
      { text: ` that may matter to you as ${c.name}’s parent. Read the full message.` },
    ],
    linkLabel: 'Read message',
  },
  inspectionPosted: {
    severity: 'information',
    title: 'A new inspection report is posted',
    message: (c, program) => [
      { text: 'An inspection report was posted for ' },
      bold(program),
      { text: `, where ${c.name} is registered.` },
    ],
    linkLabel: 'View inspection report',
  },
} satisfies Record<string, Template>;

type TemplateKey = keyof typeof TEMPLATES;

// [template, subject, minutes ago, who, detail, dismissed, new]
type Row = [TemplateKey, string, number, string, string, boolean, boolean];

const DAY = 1440;

const SUNNY = 'Sunny Days Preschool';
const LEARNERS = 'Little Learners Academy';
const RAINBOW = 'Rainbow Kids Center';

// Hand-written so the mock history is the same for every visitor. Today's items
// are new; most older ones are already completed.
const ROWS: Row[] = [
  ['confirmRegistration', 'ayla', 30, SUNNY, '', false, true],
  ['fundingExpiringSoon', 'theo', 95, '', '7', false, true],
  ['registrationAccepted', 'noor', 210, LEARNERS, '', false, false],
  ['startDateAdded', 'noor', 215, LEARNERS, 'September 8, 2026', false, false],
  ['subsidyAttention', 'ayla', DAY + 100, 'proof of income', '', false, false],
  ['registrationChanged', 'theo', DAY + 340, RAINBOW, 'part time to full time', false, false],
  ['confirmInformation', 'parent', DAY + 600, '', '', false, false],
  ['specialNeedsExpiring', 'noor', 2 * DAY + 150, '', '45', false, false],
  ['schoolYearStarting', 'parent', 2 * DAY + 400, '', 'September 2', false, false],
  ['waitingOnCoApplicant', 'ayla', 3 * DAY + 90, 'Daniel Okafor', '', false, false],
  ['fundingApproved', 'ayla', 4 * DAY + 200, '', 'Category 2', true, false],
  ['coApplicantCompleted', 'ayla', 4 * DAY + 260, 'Daniel Okafor', '', true, false],
  ['agingOut', 'theo', 5 * DAY + 120, '', '6', false, false],
  ['suspectedDuplicate', 'theo', 6 * DAY + 300, RAINBOW, '', false, false],
  ['duplicateMerged', 'theo', 8 * DAY + 220, '', '', true, false],
  ['gradeUpdated', 'theo', 9 * DAY + 60, '', 'Grade 1', true, false],
  ['applicationApproved', 'noor', 10 * DAY + 180, '', '', true, false],
  ['applicationReviewed', 'noor', 12 * DAY + 90, '', '', true, false],
  ['applicationSubmitted', 'noor', 14 * DAY + 400, '', '', true, false],
  ['secondParentAdded', 'ayla', 16 * DAY + 150, 'Daniel Okafor', '', true, false],
  ['profileUpdated', 'parent', 18 * DAY + 300, '', 'parent', true, false],
  ['profileUpdated', 'ayla', 19 * DAY + 200, '', 'child', true, false],
  ['documentsRequired', 'noor', 21 * DAY + 80, 'proof of residence', '', true, false],
  ['registrationRejected', 'theo', 24 * DAY + 250, 'Maple Grove Out of School Care', '', true, false],
  ['confirmReminder', 'noor', 27 * DAY + 130, LEARNERS, '', true, false],
  ['confirmRegistration', 'noor', 30 * DAY + 90, LEARNERS, '', true, false],
  ['fundingExpiring', 'ayla', 33 * DAY + 500, '', '52', true, false],
  ['applicationDenied', 'theo', 38 * DAY + 210, 'the household income is above the limit', '', true, false],
  ['registrationDeleted', 'theo', 42 * DAY + 60, 'Elm Street Day Home', '', true, false],
  ['childRemoved', 'ayla', 47 * DAY + 330, '', '', true, false],
  ['qualityConcern', 'noor', 52 * DAY + 180, LEARNERS, '', true, false],
  ['inspectionPosted', 'ayla', 58 * DAY + 120, SUNNY, '', true, false],
  ['gradeUpdated', 'noor', 64 * DAY + 240, '', 'Kindergarten', true, false],
];

function build(id: string, [key, subjectId, minsAgo, who, detail, dismissed, isNew]: Row, now: Date): HubNotification {
  const t: Template = TEMPLATES[key];
  const subject = SUBJECT_BY_ID.get(subjectId)!;
  const createdAt = new Date(now.getTime() - minsAgo * 60_000);
  const title = typeof t.title === 'string' ? t.title : t.title(subject.name, detail);
  return {
    id,
    title,
    message: t.message(subject, who, detail, createdAt),
    linkLabel: t.linkLabel,
    severity: t.severity,
    programId: subjectId,
    createdAt,
    dismissed,
    isNew,
  };
}

export function buildFamilyNotifications(now = new Date()): HubNotification[] {
  return ROWS.map((row, i) => build(`fp-${i}`, row, now)).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

// Lands a few seconds after the page opens, so the prototype shows a live arrival.
export function familyArrival(now = new Date()): HubNotification {
  return build('fp-arrival', ['registrationAccepted', 'ayla', 0, SUNNY, '', false, true], now);
}
