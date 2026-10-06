export type Severity = 'urgent' | 'important' | 'information';

export interface Program {
  id: string;
  name: string;
}

export interface MessagePart {
  text: string;
  bold?: boolean;
}

export interface HubNotification {
  id: string;
  title: string;
  message: MessagePart[];
  linkLabel?: string;
  // System notifications always carry a severity and a program; ones the user
  // creates have neither severity and only an optional program.
  severity?: Severity;
  programId?: string;
  createdAt: Date;
  dismissed: boolean;
  createdByUser?: boolean;
  notifyTo?: string;
}

// `rowBadge: false` drops the badge on that severity's active rows (the blue row
// tint already marks informational items). Dismissed rows on the Notifications
// page still get it, since their grey row loses the tint.
export const SEVERITIES: {
  value: Severity;
  label: string;
  badge: 'emergency' | 'important' | 'information';
  rowBadge: boolean;
}[] = [
  { value: 'urgent', label: 'Critical', badge: 'emergency', rowBadge: true },
  { value: 'important', label: 'Important', badge: 'important', rowBadge: true },
  { value: 'information', label: 'Informational', badge: 'information', rowBadge: false },
];

export const SEVERITY_RANK: Record<Severity, number> = { urgent: 0, important: 1, information: 2 };

export const PROGRAMS: Program[] = [
  { id: '80001234', name: 'Little Sprouts Early Learning Centre' },
  { id: '80002817', name: 'Bow River Daycare' },
  { id: '70001459', name: 'Maple Leaf Family Day Home Agency' },
  { id: '80003390', name: 'Sunshine Kids Child Care' },
  { id: '80004102', name: 'Aspen Grove Preschool' },
  { id: '70002265', name: 'Prairie Roots Family Day Homes' },
  { id: '80005518', name: 'Chinook Children’s Centre' },
  { id: '80006033', name: 'Tiny Treasures Daycare' },
  { id: '80006871', name: 'Riverbend Early Years' },
  { id: '70003704', name: 'Northern Lights Day Home Agency' },
  { id: '80007246', name: 'Kananaskis Kids Club' },
  { id: '80007925', name: 'Wild Rose Montessori' },
  { id: '80008361', name: 'Beacon Hill Out of School Care' },
  { id: '70004188', name: 'Foothills Family Child Care' },
  { id: '80009052', name: 'Rainbow Bridge Learning Centre' },
  { id: '80009617', name: 'Little Explorers Daycare' },
  { id: '80001088', name: 'Elbow Park Child Development Centre' },
  { id: '70005531', name: 'Peace Country Day Homes' },
  { id: '80002149', name: 'Busy Bees Early Learning' },
  { id: '80003476', name: 'Red Deer Kids Academy' },
  { id: '80004730', name: 'Meadowlark Preschool' },
  { id: '70006092', name: 'Lethbridge Family Day Home Network' },
  { id: '80005864', name: 'Sparrow’s Nest Child Care' },
  { id: '80006499', name: 'Glenora Early Learning' },
  { id: '80007013', name: 'Crowsnest Kids Care' },
  { id: '70007347', name: 'Medicine Hat Day Home Agency' },
  { id: '80008126', name: 'Willow Creek School Age Care' },
  { id: '80008785', name: 'Happy Hearts Daycare' },
  { id: '80009340', name: 'Jasper Place Child Care Society' },
  { id: '80000977', name: 'Fort McMurray Kids Den' },
];

export const PROGRAM_BY_ID = new Map(PROGRAMS.map((p) => [p.id, p]));

export const NOTIFY_TO = ['Me', 'My supervisor (Krista Kool)', 'Regional licensing admin', 'Child Care Connect'];

const PEOPLE = ['Priya Sharma', 'Jordan Blake', 'Mei Chen', 'Omar Haddad', 'Sarah Tremblay', 'Liam Wong', 'Ava Morin'];
const EDUCATORS = ['Hannah Clarke', 'Marcus Reid', 'Sofia Alvarez', 'Noah Singh', 'Grace Olsen'];

interface Template {
  severity: Severity;
  title: string;
  message: (p: Program, person: string, educator: string, date: Date) => MessagePart[];
  linkLabel?: string;
  // Expected notifications per month for one LO with a 30-program caseload.
  perMonth: number;
  // Raised by a Family Day Home Agency rather than a program; `p` is the agency.
  agency?: boolean;
}

// Program names render bold: interpolate prog(p) inside a msg`...` template.
const prog = (p: Program): MessagePart => ({ text: p.name, bold: true });

function msg(strings: TemplateStringsArray, ...values: (string | MessagePart)[]): MessagePart[] {
  const parts: MessagePart[] = [];
  strings.forEach((str, i) => {
    if (str) parts.push({ text: str });
    const v = values[i];
    if (v !== undefined) parts.push(typeof v === 'string' ? { text: v } : v);
  });
  return parts;
}
// Events and wording from CCCRT-4170 (LO notification events), limited to those
// whose trigger already exists or is available. Numbers are the ticket's rows.
// IDs in the ticket's messages are deliberately dropped. Not included (trigger
// not available yet): #5 program plan update, #6 licence renewal, #11 complaint
// received, #12 program visit overdue.
const TEMPLATES: Template[] = [
  {
    // #1: red, trigger already exists
    severity: 'urgent',
    title: 'Critical incident report was submitted',
    message: (p, person, e) =>
      msg`A new critical incident report has been submitted by ${person} about educator ${e} at ${prog(p)}.`,
    linkLabel: 'View incident report',
    perMonth: 3,
  },
  {
    // #8: red, trigger available
    severity: 'urgent',
    title: 'Critical incident report was updated',
    message: (p, _, e) => msg`An update has been added to an existing critical incident report for ${e} at ${prog(p)}.`,
    linkLabel: 'View incident report',
    perMonth: 2,
  },
  {
    // #2: yellow, trigger already exists
    severity: 'important',
    title: 'Incident report was submitted',
    message: (p, person, e) =>
      msg`A new incident report has been submitted by ${person} about educator ${e} at ${prog(p)}.`,
    linkLabel: 'View incident report',
    perMonth: 17,
  },
  {
    // #7: yellow, trigger available (program comment on a report in
    // "ministry to review" or "program to action" status)
    severity: 'important',
    title: 'Incident report was updated',
    message: (p, _, e) => msg`An update has been added to an existing incident report for ${e} at ${prog(p)}.`,
    linkLabel: 'View incident report',
    perMonth: 8,
  },
  {
    // #4: yellow, trigger already exists. "[PE name if present]" read as the
    // educator involved; present on about half the seeded items.
    severity: 'important',
    title: 'Safety plan uploaded or updated',
    message: (p, person, e, d) =>
      d.getMinutes() % 2
        ? msg`A new safety plan document has been uploaded by ${person} for ${e} at ${prog(p)}.`
        : msg`A new safety plan document has been uploaded by ${person} for ${prog(p)}.`,
    linkLabel: 'View document',
    perMonth: 2,
  },
  {
    // #3: blue, trigger already exists (agency-led Educator Review only)
    severity: 'information',
    title: 'Non-compliance was submitted',
    message: (p, _, e) =>
      msg`A new non-compliance has been identified by ${prog(p)} for educator ${e} during an agency-led Educator Review.`,
    linkLabel: 'View non-compliance',
    perMonth: 1,
    agency: true,
  },
  {
    // #9: blue, trigger available
    severity: 'information',
    title: 'Agency review was updated',
    message: (p, _, __, d) =>
      msg`${prog(p)} has added a ${d.getMinutes() % 2 ? 'comment' : 'follow-up'} to an agency review.`,
    linkLabel: 'View agency review',
    perMonth: 1,
    agency: true,
  },
  {
    // #10: blue, trigger available
    severity: 'information',
    title: 'Program contact was updated',
    message: (p, person) => msg`${prog(p)} has updated their primary program contact to ${person}.`,
    linkLabel: 'View program details',
    perMonth: 2,
  },
];

// Family Day Home Agencies are the 7000xxxx IDs in the caseload.
const AGENCIES = PROGRAMS.filter((p) => p.id.startsWith('7'));

// Seeded PRNG so every visitor (and every reload) sees the same mock history.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HISTORY_MONTHS = 18;
const DAYS_PER_MONTH = 30;

export function buildSeedNotifications(now = new Date()): HubNotification[] {
  const rand = mulberry32(20260929);
  const pick = <T>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
  const result: HubNotification[] = [];

  const push = (id: string, t: Template, createdAt: Date, dismissed: boolean, p = pick(t.agency ? AGENCIES : PROGRAMS)) =>
    result.push({
      id,
      title: t.title,
      message: t.message(p, pick(PEOPLE), pick(EDUCATORS), createdAt),
      linkLabel: t.linkLabel,
      severity: t.severity,
      programId: p.id,
      createdAt,
      dismissed,
    });

  // A few hand-placed items so Home always opens with something from today:
  // one critical, plus the two most common events.
  const today: [number, number][] = [
    [0, 5], // critical incident report submitted, 5 minutes ago
    [2, 40], // incident report submitted
    [3, 150], // incident report updated
  ];
  today.forEach(([templateIndex, minsAgo], i) =>
    push(`n-r${i}`, TEMPLATES[templateIndex], new Date(now.getTime() - minsAgo * 60_000), false),
  );

  // Exactly each event's monthly rate in every 30-day window, so the current
  // month (what Home shows) matches the rates rather than random drift. Today's
  // hand-placed items count toward the current month.
  TEMPLATES.forEach((t, ti) => {
    for (let m = 0; m < HISTORY_MONTHS; m++) {
      const placedToday = m === 0 ? today.filter(([index]) => index === ti).length : 0;
      for (let i = 0; i < t.perMonth - placedToday; i++) {
        const createdAt = weekdayInWindow(m);
        // Older items are far more likely to have been dismissed already.
        const dismissChance = m > 0 ? 0.85 : 0.25;
        push(`n-${ti}-${m}-${i}`, t, createdAt, rand() < dismissChance);
      }
    }
  });

  // A working-hours time on a weekday (programs report on weekdays) in the
  // m-th 30-day window back from yesterday.
  function weekdayInWindow(m: number): Date {
    const d = new Date(now);
    do {
      d.setTime(now.getTime());
      d.setDate(d.getDate() - (m * DAYS_PER_MONTH + 1 + Math.floor(rand() * DAYS_PER_MONTH)));
    } while (d.getDay() === 0 || d.getDay() === 6);
    d.setHours(8 + Math.floor(rand() * 9), Math.floor(rand() * 60), 0, 0);
    return d;
  }

  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
