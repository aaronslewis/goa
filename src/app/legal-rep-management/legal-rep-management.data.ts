// Program, organization and legal rep IDs exist in search-service's data, so
// every link in the table opens a matching profile there.

export type EmailStatus = 'sent' | 'failed' | 'in-review';
export type AccountStatus = 'created' | 'not-created';
export type AckStatus = 'confirmed' | 'not-confirmed';

export interface LegalRepEmail {
  id: string;
  org: { id: string; name: string };
  program: { id: string; name: string };
  rep: { id: string; name: string; email: string };
  /** ISO date, for filtering and sorting. */
  emailDate: string;
  /** Null until the email has actually gone out. */
  emailSentAt: string | null;
  emailStatus: EmailStatus;
  scenario: string;
  /** Null while the email hasn't reached the rep, so no account step yet. */
  account: AccountStatus | null;
  accountCreatedAt: string | null;
  ack: AckStatus | null;
  ackAt: string | null;
}

// The prototype's "today", so the date range tabs always have rows to show.
export const TODAY = '2026-03-19';

export type DateRange = 'today' | '7' | '30' | 'all';

const NEW_PROGRAM_NEW_REP = 'New program, new Legal rep - Create account and confirm acknowledgement';
const EXISTING_PROGRAM_NEW_REP = 'Existing program, new Legal rep - Create account and confirm acknowledgement';
const EXISTING_REP_NEW_PROGRAM = 'Existing Legal rep, new program - Confirm acknowledgement';
const REP_DETAILS_UPDATED = 'Legal rep details updated - Confirm acknowledgement';

export const LEGAL_REP_EMAILS: LegalRepEmail[] = [
  {
    id: 'e1',
    org: { id: '123456789', name: 'EARLY TO SCHOOL LEARNING.' },
    program: { id: '543821348', name: 'EDMONTON EARLY LEARNING AND CARE' },
    rep: { id: 'u10', name: 'Charlie Day', email: 'charlie.day@earlylearning.ca' },
    emailDate: '2026-03-19',
    emailSentAt: 'Mar 19, 2026 9:15 am MDT',
    emailStatus: 'sent',
    scenario: NEW_PROGRAM_NEW_REP,
    account: null,
    accountCreatedAt: null,
    ack: null,
    ackAt: null,
  },
  {
    id: 'e2',
    org: { id: '52217454', name: 'TODDLER SCHOOL' },
    program: { id: '34217453', name: 'ACE CHILDREN CENTRE' },
    rep: { id: 'u11', name: 'James McDonald', email: 'james.mcdonald@company.com' },
    emailDate: '2026-03-19',
    emailSentAt: null,
    emailStatus: 'failed',
    scenario: EXISTING_PROGRAM_NEW_REP,
    account: null,
    accountCreatedAt: null,
    ack: null,
    ackAt: null,
  },
  {
    id: 'e3',
    org: { id: '432881234', name: '7765123 Alberta Ltd.' },
    program: { id: '542312854', name: 'MOON CHILDREN CENTRE' },
    rep: { id: 'u12', name: 'Amanda Rosset', email: 'amanda.rosset@company.ca' },
    emailDate: '2026-03-19',
    emailSentAt: null,
    emailStatus: 'in-review',
    scenario: NEW_PROGRAM_NEW_REP,
    account: null,
    accountCreatedAt: null,
    ack: null,
    ackAt: null,
  },
  {
    id: 'e4',
    org: { id: '342176345', name: 'IMMANUEL EVANGELICAL LUTHERAN CHURCH OF ROCKY MOUNTAIN HOUSE, ALBERTA' },
    program: { id: '542312855', name: 'LITTLE CUBS LEARNING CENTRE' },
    rep: { id: 'u13', name: 'Carolyn Parkes', email: 'carolyn.parkes@company.com' },
    emailDate: '2026-03-19',
    emailSentAt: 'Mar 19, 2026 11:42 am MDT',
    emailStatus: 'sent',
    scenario: NEW_PROGRAM_NEW_REP,
    account: null,
    accountCreatedAt: null,
    ack: null,
    ackAt: null,
  },
  {
    id: 'e5',
    org: { id: '19345678', name: 'Magic Learning Centre, 123' },
    program: { id: '180012345', name: 'KIDZ LEARNING CENTRE' },
    rep: { id: 'u4', name: 'Fabiola Beach', email: 'fabiola.beach@kidzlearning.com' },
    emailDate: '2026-03-17',
    emailSentAt: 'Mar 17, 2026 2:08 pm MDT',
    emailStatus: 'sent',
    scenario: REP_DETAILS_UPDATED,
    account: 'created',
    accountCreatedAt: 'Mar 17, 2026',
    ack: 'confirmed',
    ackAt: 'Mar 18, 2026',
  },
  {
    id: 'e6',
    org: { id: '12345678', name: 'SunnySide Daycare Pvt. Ltd.' },
    program: { id: '12347546', name: 'SUNNYSIDE DAYCARE' },
    rep: { id: 'u14', name: 'Dennis Reynolds', email: 'dennis.reynolds@sunnyside.com' },
    emailDate: '2026-03-16',
    emailSentAt: 'Mar 16, 2026 10:30 am MDT',
    emailStatus: 'sent',
    scenario: EXISTING_PROGRAM_NEW_REP,
    account: 'created',
    accountCreatedAt: 'Mar 16, 2026',
    ack: 'not-confirmed',
    ackAt: null,
  },
  {
    id: 'e7',
    org: { id: '12345678', name: 'SunnySide Daycare Pvt. Ltd.' },
    program: { id: '12345546', name: 'SUNNYSIDE LICENCED DAYHOME' },
    rep: { id: 'u15', name: 'Mellissa Smith', email: 'mellissasmith@sunnyside.com' },
    emailDate: '2026-03-14',
    emailSentAt: 'Mar 14, 2026 4:51 pm MDT',
    emailStatus: 'sent',
    scenario: EXISTING_REP_NEW_PROGRAM,
    account: 'not-created',
    accountCreatedAt: null,
    ack: 'not-confirmed',
    ackAt: null,
  },
  {
    id: 'e8',
    org: { id: '15235542', name: 'SunnySide Daycare Ltd. North Edmonton' },
    program: { id: '12344423', name: 'SUNNYSIDE DAYCARE NE CALGARY' },
    rep: { id: 'u1', name: 'Sunny Gill', email: 'sunnygill@abcdaycare.ca' },
    emailDate: '2026-03-04',
    emailSentAt: null,
    emailStatus: 'failed',
    scenario: NEW_PROGRAM_NEW_REP,
    account: null,
    accountCreatedAt: null,
    ack: null,
    ackAt: null,
  },
  {
    id: 'e9',
    org: { id: '11235342', name: 'SunnySide Daycare Ltd. & OSC North Edmonton' },
    program: { id: '81001234', name: 'SUNNYSIDE DAYCARE SE CALGARY' },
    rep: { id: 'u3', name: 'Sunny Osei', email: 'sunny.osei@brightbeginnings.ca' },
    emailDate: '2026-02-26',
    emailSentAt: 'Feb 26, 2026 8:47 am MST',
    emailStatus: 'sent',
    scenario: NEW_PROGRAM_NEW_REP,
    account: 'created',
    accountCreatedAt: 'Feb 27, 2026',
    ack: 'confirmed',
    ackAt: 'Feb 27, 2026',
  },
  {
    id: 'e10',
    org: { id: '11235342', name: 'SunnySide Daycare Ltd. & OSC North Edmonton' },
    program: { id: '81003423', name: 'SUNNYSIDE DAYCARE NE CALGARY' },
    rep: { id: 'u2', name: 'Sunny Jane', email: 'sunnyjane@company.com' },
    emailDate: '2026-01-12',
    emailSentAt: 'Jan 12, 2026 1:20 pm MST',
    emailStatus: 'sent',
    scenario: EXISTING_PROGRAM_NEW_REP,
    account: 'not-created',
    accountCreatedAt: null,
    ack: 'not-confirmed',
    ackAt: null,
  },
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function inDateRange(isoDate: string, range: DateRange): boolean {
  if (range === 'all') return true;
  if (range === 'today') return isoDate === TODAY;
  const daysAgo = (Date.parse(TODAY) - Date.parse(isoDate)) / DAY_MS;
  return daysAgo >= 0 && daysAgo < Number(range);
}

export function formatEmailDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-US',{ month: 'short', day: 'numeric', year: 'numeric' });
}
