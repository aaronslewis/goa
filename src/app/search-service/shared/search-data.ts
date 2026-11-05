export interface OrgResult {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  operatingModel: 'For profit' | 'Non-profit';
}

export interface ProgramResult {
  id: string;
  name: string;
  subtitle: string;
  programType: string;
  status: string;
  /** Lets a program without an authored detail record show its real licence holder. */
  licenceHolderId?: string;
}

export interface UserResult {
  id: string;
  name: string;
  email: string;
  portalStatus: 'Has account' | 'No account';
  phone?: string;
  accountCreated?: string;
  lastLogin?: string;
}

export const ORGANIZATIONS: OrgResult[] = [
  { id: '14327546', name: 'SunnySide Daycare Ltd.', subtitle: '243 Marsh Valley, Parkwood Drive, Alberta T2A 1B3', type: 'Incorporated', operatingModel: 'For profit' },
  { id: '14335546', name: 'SunnySide Daycare Licenced Dayhome South Edmonton', subtitle: '1470 Macleod Trl SE, Calgary, Alberta T3S 0A7', type: 'Incorporated', operatingModel: 'For profit' },
  { id: '15235542', name: 'SunnySide Daycare Ltd. North Edmonton', subtitle: '370 Canyon Meadows Drive SE, Calgary, Alberta T2J 7C6', type: 'Incorporated', operatingModel: 'Non-profit' },
  { id: '11235342', name: 'SunnySide Daycare Ltd. & OSC North Edmonton', subtitle: '310 Willow Street, Sherwood Park Strathcona County, Alberta T4A 1O3', type: 'Incorporated', operatingModel: 'For profit' },
  { id: '10805342', name: 'SunnySide Up Daycare Ltd. East Edmonton', subtitle: '12345 Jasper Avenue NW, Edmonton, AB T5J 1N9', type: 'Sole proprietorship', operatingModel: 'For profit' },
  { id: '10055342', name: 'SunnySide View Learn and Play, SE Calgary', subtitle: '1005 5 Street SE, Calgary, AB T2G 1B5', type: 'Incorporated', operatingModel: 'Non-profit' },
  { id: '12000342', name: 'SunnySide Sun and Moon Learning Centre, SW Calgary', subtitle: '1200 3 Avenue SW, Calgary, AB T2P 1B5', type: 'Incorporated', operatingModel: 'Non-profit' },
  { id: '12301342', name: 'SunnySide Hillhurst Daycare', subtitle: '1230 Kensington Rd NW, Calgary, AB T2N 3P9', type: 'Incorporated', operatingModel: 'For profit' },
  { id: '18007546', name: 'SunnySide Daycare NW Edmonton', subtitle: '18007 100 Avenue NW, Edmonton, AB T5T 6J6', type: 'Sole proprietorship', operatingModel: 'For profit' },
  { id: '19345678', name: 'Magic Learning Centre, 123', subtitle: 'Edmonton, AB T3S 1D4', type: 'Incorporated', operatingModel: 'For profit' },
  { id: '12345678', name: 'SunnySide Daycare Pvt. Ltd.', subtitle: '12345 104 Avenue NW, Edmonton, AB T5N 0Y9', type: 'Incorporated', operatingModel: 'For profit' },
  { id: '900519301', name: '1316521 Alberta Limited (Vogel Family Day Homes)', subtitle: '2509-10th Avenue, Wainwright, AB T9W1W3', type: 'Incorporated', operatingModel: 'For profit' },
  // Licence holders from legal-rep-management.
  { id: '123456789', name: 'Early to School Learning.', subtitle: '10150 82 Avenue NW, Edmonton, AB T6E 1Z4', type: 'Incorporated', operatingModel: 'For profit' },
  { id: '52217454', name: 'Toddler School', subtitle: '4807 50 Street, Red Deer, AB T4N 1X5', type: 'Sole proprietorship', operatingModel: 'For profit' },
  { id: '432881234', name: '7765123 Alberta Ltd.', subtitle: '220 4 Avenue SW, Calgary, AB T2P 0H5', type: 'Incorporated', operatingModel: 'For profit' },
  { id: '342176345', name: 'Immanuel Evangelical Lutheran Church of Rocky Mountain House, Alberta', subtitle: '5020 52 Street, Rocky Mountain House, AB T4T 1T3', type: 'Society', operatingModel: 'Non-profit' },
];

export const PROGRAMS: ProgramResult[] = [
  { id: '12347546', name: 'SunnySide Daycare', subtitle: '243 Marsh Valley, Parkwood Drive, Alberta T2A 1B3', programType: 'Facility based', status: 'Licenced', licenceHolderId: '12345678' },
  { id: '12345546', name: 'SunnySide Licenced Dayhome', subtitle: '1470 Macleod Trl SE, Calgary, Alberta T3S 0A7', programType: 'Family day home', status: 'Licenced', licenceHolderId: '12345678' },
  { id: '12344423', name: 'SunnySide Daycare NE Calgary', subtitle: '370 Canyon Meadows Drive SE, Calgary, Alberta T2J 7C6', programType: 'Facility based', status: 'Licenced', licenceHolderId: '15235542' },
  { id: '81001234', name: 'SunnySide Daycare SE Calgary', subtitle: '310 Willow Street, Sherwood Park Strathcona County, Alberta T4A 1O3', programType: 'Facility based', status: 'Licenced (probationary)', licenceHolderId: '11235342' },
  { id: '81003423', name: 'SunnySide Daycare NE Calgary', subtitle: '338 Willow Street, Sherwood Park Strathcona County, Alberta T8A 1R3', programType: 'Facility based', status: 'Licenced', licenceHolderId: '11235342' },
  { id: '81004424', name: 'SunnySide Daycare SE Calgary', subtitle: '310 Jasper Ave NW, Edmonton, AB T5J 1P1', programType: 'Facility based', status: 'Licenced', licenceHolderId: '11235342' },
  { id: '180012345', name: 'Kidz Learning Centre', subtitle: '10025 102A Avenue NW, Edmonton, AB T5J 1G3', programType: 'Facility based', status: 'Licenced (probationary)', licenceHolderId: '19345678' },
  { id: '10000391', name: '1316521 Alberta Limited (Vogel Family Day Homes)', subtitle: '2509-10th Avenue, Wainwright, AB T9W1W3', programType: 'Day home agency', status: 'Unlicensed', licenceHolderId: '900519301' },
  // Programs from legal-rep-management.
  { id: '543821348', name: 'Edmonton Early Learning and Care', subtitle: '10150 82 Avenue NW, Edmonton, AB T6E 1Z4', programType: 'Facility based', status: 'Licenced', licenceHolderId: '123456789' },
  { id: '34217453', name: 'Ace Children Centre', subtitle: '4807 50 Street, Red Deer, AB T4N 1X5', programType: 'Facility based', status: 'Licenced', licenceHolderId: '52217454' },
  { id: '542312854', name: 'Moon Children Centre', subtitle: '220 4 Avenue SW, Calgary, AB T2P 0H5', programType: 'Facility based', status: 'Licenced', licenceHolderId: '432881234' },
  { id: '542312855', name: 'Little Cubs Learning Centre', subtitle: '5020 52 Street, Rocky Mountain House, AB T4T 1T3', programType: 'Facility based', status: 'Licenced', licenceHolderId: '342176345' },
];

export const USERS: UserResult[] = [
  { id: 'u1', name: 'Sunny Gill', email: 'sunnygill@abcdaycare.ca', portalStatus: 'Has account', phone: '7804561290', accountCreated: 'Apr 05, 2023, 11:25 AM', lastLogin: 'Oct 29, 2026, 10:08 AM' },
  { id: 'u2', name: 'Sunny Jane', email: 'sunnyjane@company.com', portalStatus: 'No account' },
  { id: 'u3', name: 'Sunny Osei', email: 'sunny.osei@brightbeginnings.ca', portalStatus: 'Has account', phone: '5872213344', accountCreated: 'Aug 18, 2024, 2:40 PM', lastLogin: 'Oct 21, 2026, 4:52 PM' },
  { id: 'u4', name: 'Fabiola Beach', email: 'fabiola.beach@kidzlearning.com', portalStatus: 'Has account', phone: '7803452691', accountCreated: 'Jan 12, 2023, 9:03 AM', lastLogin: 'Oct 28, 2026, 8:15 AM' },
  // Legal reps from legal-rep-management.
  { id: 'u10', name: 'Charlie Day', email: 'charlie.day@earlylearning.ca', portalStatus: 'No account' },
  { id: 'u11', name: 'James McDonald', email: 'james.mcdonald@company.com', portalStatus: 'No account' },
  { id: 'u12', name: 'Amanda Rosset', email: 'amanda.rosset@company.ca', portalStatus: 'No account' },
  { id: 'u13', name: 'Carolyn Parkes', email: 'carolyn.parkes@company.com', portalStatus: 'No account' },
  { id: 'u14', name: 'Dennis Reynolds', email: 'dennis.reynolds@sunnyside.com', portalStatus: 'Has account', phone: '7803452691', accountCreated: 'Mar 16, 2026, 10:41 AM', lastLogin: 'Oct 27, 2026, 1:30 PM' },
  { id: 'u15', name: 'Mellissa Smith', email: 'mellissasmith@sunnyside.com', portalStatus: 'No account' },
];

export interface Agreement {
  /** Null until an agreement is uploaded. */
  signedOn: string | null;
  /** Affordability Grant only: the program can't apply. */
  ineligible?: boolean;
}

export interface Licence {
  status: string;
  statusChangeDate: string;
  issueDate: string;
  startDate: string;
  endDate: string;
  expiryDate: string;
  type: string;
  reasonCode: string;
  variationRequestDate: string;
  reasonForInactivity: string;
}

export interface ProgramDetail {
  name: string;
  id: string;
  status: string;
  type: string;
  physicalAddress: string[];
  mailingAddress: string[];
  contact: { name: string; role: string; phone: string };
  email: string;
  licensingOfficer: string;
  regionalAuthority: string;
  affordabilityRegion: string;
  subsidyAgreement: 'Yes' | 'No';
  licenceHolder: { id: string; name: string; operatingModel: string };
  licence: Licence;
  funding: {
    /** Family day home agencies only. */
    fdhac?: Agreement;
    affordability: Agreement;
    eceWorkforce: Agreement;
  };
}

type AuthoredProgram = Omit<ProgramDetail, 'name' | 'id' | 'status' | 'type' | 'licenceHolder'>;

const LICENSED = (issued: string, expires: string): Licence => ({
  status: 'Licenced',
  statusChangeDate: '-',
  issueDate: issued,
  startDate: issued,
  endDate: '-',
  expiryDate: expires,
  type: 'Regular',
  reasonCode: '-',
  variationRequestDate: '-',
  reasonForInactivity: '-',
});

// Programs with a fuller profile than their search summary gives. Name, ID,
// status, type and licence holder always come from PROGRAMS/ORGANIZATIONS.
const PROGRAM_DETAILS: Record<string, AuthoredProgram> = {
  '180012345': {
    physicalAddress: ['10025 102A AVENUE NW', 'EDMONTON, AB T5J 1G3'],
    mailingAddress: ['12345 JASPER AVENUE NW', 'EDMONTON, AB T5J 1N9'],
    contact: { name: 'FABIOLA BEACH', role: 'DIRECTOR', phone: '780-345-2691' },
    email: 'info@kidzlearning.com',
    licensingOfficer: 'LENA YEN',
    regionalAuthority: '005 CALGARY',
    affordabilityRegion: 'Edmonton',
    subsidyAgreement: 'Yes',
    licence: { ...LICENSED('Jun 01, 2025', 'Nov 30, 2026'), status: 'Licenced (probationary)', type: 'Probationary', statusChangeDate: 'Jun 01, 2025' },
    funding: { affordability: { signedOn: 'Apr 02, 2026' }, eceWorkforce: { signedOn: 'Apr 10, 2026' } },
  },
  '12347546': {
    physicalAddress: ['243 MARSH VALLEY', 'PARKWOOD DRIVE, AB T2A 1B3'],
    mailingAddress: ['12345 104 AVENUE NW', 'EDMONTON, AB T5N 0Y9'],
    contact: { name: 'DENNIS REYNOLDS', role: 'DIRECTOR', phone: '780-345-2691' },
    email: 'dennis.reynolds@sunnyside.com',
    licensingOfficer: 'LENA YEN',
    regionalAuthority: '005 CALGARY',
    affordabilityRegion: 'Calgary',
    subsidyAgreement: 'Yes',
    licence: LICENSED('Sep 15, 2024', 'Sep 14, 2027'),
    funding: { affordability: { signedOn: 'Mar 28, 2026' }, eceWorkforce: { signedOn: null } },
  },
  '12345546': {
    physicalAddress: ['1470 MACLEOD TRL SE', 'CALGARY, AB T3S 0A7'],
    mailingAddress: ['12345 104 AVENUE NW', 'EDMONTON, AB T5N 0Y9'],
    contact: { name: 'MELLISSA SMITH', role: 'DIRECTOR', phone: '780-345-2691' },
    email: 'mellissasmith@sunnyside.com',
    licensingOfficer: 'LENA YEN',
    regionalAuthority: '005 CALGARY',
    affordabilityRegion: 'Calgary',
    subsidyAgreement: 'No',
    licence: LICENSED('Jan 10, 2025', 'Jan 09, 2028'),
    funding: { affordability: { signedOn: null }, eceWorkforce: { signedOn: null } },
  },
  '10000391': {
    physicalAddress: ['2509-10TH AVENUE', 'WAINWRIGHT, AB T9W1W3'],
    mailingAddress: ['2509-10TH AVENUE', 'WAINWRIGHT, AB T9W1W3'],
    contact: { name: 'VOGEL, VICTORIA -VICKI', role: 'OWNER', phone: '780-842-5684' },
    email: '-',
    licensingOfficer: 'DANA SMITH',
    regionalAuthority: '004 CENTRAL',
    affordabilityRegion: 'All regions',
    subsidyAgreement: 'No',
    licence: {
      status: 'Unlicensed',
      statusChangeDate: '-',
      issueDate: '-',
      startDate: '-',
      endDate: '-',
      expiryDate: '-',
      type: 'Unknown',
      reasonCode: '-',
      variationRequestDate: '-',
      reasonForInactivity: '-',
    },
    funding: {
      fdhac: { signedOn: null },
      affordability: { signedOn: null, ineligible: true },
      eceWorkforce: { signedOn: null },
    },
  },
};

const FALLBACK_HOLDER = { id: '12345678', name: 'SunnySide Daycare Pvt. Ltd.', operatingModel: 'For profit' };

export function getProgramDetail(id: string | null): ProgramDetail {
  const summary = PROGRAMS.find((p) => p.id === id) ?? PROGRAMS.find((p) => p.id === '180012345')!;
  const org = ORGANIZATIONS.find((o) => o.id === summary.licenceHolderId) ?? FALLBACK_HOLDER;
  const authored = PROGRAM_DETAILS[summary.id] ?? buildProgramDetail(summary);
  return {
    ...authored,
    name: summary.name.toUpperCase(),
    id: summary.id,
    status: summary.status,
    type: summary.programType.toUpperCase(),
    licenceHolder: { id: org.id, name: org.name.toUpperCase(), operatingModel: org.operatingModel },
  };
}

// No authored record for this program, so build a plausible one from its
// search summary.
function buildProgramDetail(summary: ProgramResult): AuthoredProgram {
  const [line1, ...rest] = summary.subtitle.toUpperCase().split(', ');
  const address = [line1, rest.join(', ')];
  return {
    physicalAddress: address,
    mailingAddress: address,
    contact: { name: 'FABIOLA BEACH', role: 'DIRECTOR', phone: '780-345-2691' },
    email: 'info@example.com',
    licensingOfficer: 'LENA YEN',
    regionalAuthority: '005 CALGARY',
    affordabilityRegion: 'All regions',
    subsidyAgreement: 'No',
    licence: { ...LICENSED('Feb 03, 2025', 'Feb 02, 2028'), status: summary.status },
    funding: { affordability: { signedOn: null }, eceWorkforce: { signedOn: null } },
  };
}

export interface Contact {
  name: string;
  phone: string;
  email: string;
  address: string[];
}

export interface LegalRep {
  name: string;
  role: string;
  status: 'Active' | 'Pending';
}

export interface OrgDetail extends OrgResult {
  primaryContact: Contact;
  secondaryContact: Contact;
  legalRepresentatives: LegalRep[];
  programs: ProgramResult[];
}

const NO_CONTACT: Contact = { name: '-', phone: '-', email: '-', address: ['-'] };

const ORG_CONTACTS: Record<string, { primary: Contact; secondary?: Contact; reps: LegalRep[] }> = {
  '12345678': {
    primary: { name: 'DENNIS REYNOLDS', phone: '7803452691', email: 'dennis.reynolds@sunnyside.com', address: ['12345 104 AVENUE NW', 'EDMONTON, AB, T5N 0Y9'] },
    secondary: { name: 'MELLISSA SMITH', phone: '-', email: 'mellissasmith@sunnyside.com', address: ['-'] },
    reps: [
      { name: 'Dennis Reynolds', role: 'Director', status: 'Active' },
      { name: 'Mellissa Smith', role: 'Director', status: 'Active' },
      { name: 'Charlie Kelly', role: 'Officer', status: 'Active' },
      { name: 'Deandra Reynolds', role: 'Officer', status: 'Pending' },
    ],
  },
  '900519301': {
    primary: { name: 'VICTORIA (VICKI VOGEL', phone: '7808425684', email: '-', address: ['2509-10TH AVENUE', 'WA, AB, T9W1W3'] },
    reps: [],
  },
};

export function getOrgDetail(id: string | null): OrgDetail {
  const org = ORGANIZATIONS.find((o) => o.id === id) ?? ORGANIZATIONS.find((o) => o.id === '12345678')!;
  const contacts = ORG_CONTACTS[org.id];
  const [line1, ...rest] = org.subtitle.toUpperCase().split(', ');
  return {
    ...org,
    name: org.name.toUpperCase(),
    primaryContact: contacts?.primary ?? { ...NO_CONTACT, name: 'PRIMARY CONTACT', address: [line1, rest.join(', ')] },
    secondaryContact: contacts?.secondary ?? NO_CONTACT,
    legalRepresentatives: contacts?.reps ?? [],
    programs: PROGRAMS.filter((p) => p.licenceHolderId === org.id),
  };
}

export function matchesQuery(text: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return text.toLowerCase().includes(q);
}

export function searchOrganizations(query: string): OrgResult[] {
  return ORGANIZATIONS.filter((o) => matchesQuery(o.name, query) || matchesQuery(o.id, query));
}

export function searchPrograms(query: string): ProgramResult[] {
  return PROGRAMS.filter((p) => matchesQuery(p.name, query) || matchesQuery(p.id, query) || matchesQuery(p.subtitle, query));
}

export function searchUsers(query: string): UserResult[] {
  return USERS.filter((u) => matchesQuery(u.name, query) || matchesQuery(u.email, query));
}
