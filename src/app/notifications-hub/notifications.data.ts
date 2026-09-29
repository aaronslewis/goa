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

export const SEVERITIES: { value: Severity; label: string; badge: 'emergency' | 'important' | 'information' }[] = [
  { value: 'urgent', label: 'Urgent', badge: 'emergency' },
  { value: 'important', label: 'Important', badge: 'important' },
  { value: 'information', label: 'Information', badge: 'information' },
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

export const NOTIFY_TO = ['Just me', 'My caseload team', 'Licensing officers', 'Program managers', 'All staff'];

const PEOPLE = ['Priya Sharma', 'Jordan Blake', 'Mei Chen', 'Omar Haddad', 'Sarah Tremblay', 'Liam Wong', 'Ava Morin'];
const EDUCATORS = ['Hannah Clarke', 'Marcus Reid', 'Sofia Alvarez', 'Noah Singh', 'Grace Olsen'];

interface Template {
  severity: Severity;
  title: string;
  message: (p: Program, person: string, educator: string, date: Date) => MessagePart[];
  linkLabel?: string;
  weight: number;
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
    weight: 2,
  },
  {
    // #8: red, trigger available
    severity: 'urgent',
    title: 'Critical incident report was updated',
    message: (p, _, e) => msg`An update has been added to an existing critical incident report for ${e} at ${prog(p)}.`,
    linkLabel: 'View incident report',
    weight: 1,
  },
  {
    // #2: yellow, trigger already exists
    severity: 'important',
    title: 'Incident report was submitted',
    message: (p, person, e) =>
      msg`A new incident report has been submitted by ${person} about educator ${e} at ${prog(p)}.`,
    linkLabel: 'View incident report',
    weight: 4,
  },
  {
    // #7: yellow, trigger available (program comment on a report in
    // "ministry to review" or "program to action" status)
    severity: 'important',
    title: 'Incident report was updated',
    message: (p, _, e) => msg`An update has been added to an existing incident report for ${e} at ${prog(p)}.`,
    linkLabel: 'View incident report',
    weight: 3,
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
    weight: 2,
  },
  {
    // #3: blue, trigger already exists (agency-led Educator Review only)
    severity: 'information',
    title: 'Non-compliance was submitted',
    message: (p, _, e) =>
      msg`A new non-compliance has been identified by ${prog(p)} for educator ${e} during an agency-led Educator Review.`,
    linkLabel: 'View non-compliance',
    weight: 2,
    agency: true,
  },
  {
    // #9: blue, trigger available
    severity: 'information',
    title: 'Agency review was updated',
    message: (p, _, __, d) =>
      msg`${prog(p)} has added a ${d.getMinutes() % 2 ? 'comment' : 'follow-up'} to an agency review.`,
    linkLabel: 'View agency review',
    weight: 2,
    agency: true,
  },
  {
    // #10: blue, trigger available
    severity: 'information',
    title: 'Program contact was updated',
    message: (p, person) => msg`${prog(p)} has updated their primary program contact to ${person}.`,
    linkLabel: 'View program details',
    weight: 3,
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

export function buildSeedNotifications(now = new Date()): HubNotification[] {
  const rand = mulberry32(20260929);
  const pick = <T>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
  const weighted = TEMPLATES.flatMap((t) => Array(t.weight).fill(t) as Template[]);
  const result: HubNotification[] = [];

  // Hand-placed recent items so Home always opens with a spread like the Figma.
  const recentOffsetsMin = [5, 15, 20, 118, 178, 290, 358, 418, 60 * 24 + 125];
  const recentTemplates = [0, 4, 2, 3, 1, 5, 6, 7, 2];
  recentOffsetsMin.forEach((mins, i) => {
    const t = TEMPLATES[recentTemplates[i]];
    const p = t.agency ? AGENCIES[i % AGENCIES.length] : PROGRAMS[(i * 3) % PROGRAMS.length];
    const createdAt = new Date(now.getTime() - mins * 60_000);
    result.push({
      id: `n-r${i}`,
      title: t.title,
      message: t.message(p, pick(PEOPLE), pick(EDUCATORS), createdAt),
      linkLabel: t.linkLabel,
      severity: t.severity,
      programId: p.id,
      createdAt,
      dismissed: false,
    });
  });

  // ~18 months of history, denser in recent weeks.
  for (let i = 0; i < 300; i++) {
    const daysAgo = Math.floor(Math.pow(rand(), 1.6) * 540) + 2;
    const createdAt = new Date(now);
    createdAt.setDate(createdAt.getDate() - daysAgo);
    createdAt.setHours(7 + Math.floor(rand() * 11), Math.floor(rand() * 60), 0, 0);
    const t = pick(weighted);
    const p = pick(t.agency ? AGENCIES : PROGRAMS);
    // Older items are far more likely to have been dismissed already.
    const dismissChance = daysAgo > 30 ? 0.85 : 0.25;
    result.push({
      id: `n-${i}`,
      title: t.title,
      message: t.message(p, pick(PEOPLE), pick(EDUCATORS), createdAt),
      linkLabel: t.linkLabel,
      severity: t.severity,
      programId: p.id,
      createdAt,
      dismissed: rand() < dismissChance,
    });
  }

  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
