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
}

export interface UserResult {
  id: string;
  name: string;
  email: string;
  portalStatus: string;
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
];

export const PROGRAMS: ProgramResult[] = [
  { id: '12347546', name: 'SunnySide Daycare', subtitle: '243 Marsh Valley, Parkwood Drive, Alberta T2A 1B3', programType: 'Facility based', status: 'Licenced' },
  { id: '12345546', name: 'SunnySide Licenced Dayhome', subtitle: '1470 Macleod Trl SE, Calgary, Alberta T3S 0A7', programType: 'Family day home', status: 'Licenced' },
  { id: '12344423', name: 'SunnySide Daycare NE Calgary', subtitle: '370 Canyon Meadows Drive SE, Calgary, Alberta T2J 7C6', programType: 'Facility based', status: 'Licenced' },
  { id: '81001234', name: 'SunnySide Daycare SE Calgary', subtitle: '310 Willow Street, Sherwood Park Strathcona County, Alberta T4A 1O3', programType: 'Facility based', status: 'Licenced (probationary)' },
  { id: '81003423', name: 'SunnySide Daycare NE Calgary', subtitle: '338 Willow Street, Sherwood Park Strathcona County, Alberta T8A 1R3', programType: 'Facility based', status: 'Licenced' },
  { id: '81004424', name: 'SunnySide Daycare SE Calgary', subtitle: '310 Jasper Ave NW, Edmonton, AB T5J 1P1', programType: 'Facility based', status: 'Licenced' },
  { id: '180012345', name: 'Kidz Learning Centre', subtitle: '10025 102A Avenue NW, Edmonton, AB T5J 1G3', programType: 'Facility based', status: 'Licenced (probationary)' },
];

export const USERS: UserResult[] = [
  { id: 'u1', name: 'Sunny Gill', email: 'sunnygill@abcdaycare.ca', portalStatus: 'Active account' },
  { id: 'u2', name: 'Sunny Jane', email: 'sunnyjane@company.com', portalStatus: 'No account' },
  { id: 'u3', name: 'Sunny Osei', email: 'sunny.osei@brightbeginnings.ca', portalStatus: 'Active account' },
  { id: 'u4', name: 'Fabiola Beach', email: 'fabiola.beach@kidzlearning.com', portalStatus: 'Active account' },
];

export interface ProgramDetail {
  name: string;
  id: string;
  status: string;
  type: string;
  careTypes: string;
  physicalAddress: string[];
  mailingAddress: string[];
  contact: { name: string; role: string; phone: string };
  email: string;
  licensingOfficer: string;
  regionalAuthority: string;
  licenceHolder: { name: string; address: string; operatingModel: string };
}

const PROGRAM_DETAILS: Record<string, ProgramDetail> = {
  '180012345': {
    name: 'KIDZ LEARNING CENTRE',
    id: '180012345',
    status: 'Licenced (probationary)',
    type: 'Facility based',
    careTypes: 'Preschool',
    physicalAddress: ['10025 102A Avenue NW', 'Edmonton, AB T5J 1G3'],
    mailingAddress: ['12345 Jasper Avenue NW', 'Edmonton, AB T5J 1N9'],
    contact: { name: 'Fabiola Beach', role: 'Director', phone: '780-345-2691' },
    email: 'INFO@kidzlearning.com',
    licensingOfficer: 'Lena Yen',
    regionalAuthority: '005 CALGARY',
    licenceHolder: { name: 'MAGIC LEARNING CENTRE, 123', address: 'EDMONTON T3S 1D4', operatingModel: 'For profit' },
  },
  '12347546': {
    name: 'SUNNYSIDE DAYCARE',
    id: '12347546',
    status: 'Licenced',
    type: 'Facility based',
    careTypes: 'Preschool, School age',
    physicalAddress: ['243 Marsh Valley', 'Parkwood Drive, Alberta T2A 1B3'],
    mailingAddress: ['12345 104 Avenue NW', 'Edmonton, AB T5N 0Y9'],
    contact: { name: 'Dennis Reynolds', role: 'Director', phone: '780-345-2691' },
    email: 'dennis.reynolds@sunnyside.com',
    licensingOfficer: 'Lena Yen',
    regionalAuthority: '005 CALGARY',
    licenceHolder: { name: 'SUNNYSIDE DAYCARE PVT. LTD.', address: '12345 104 Avenue NW, Edmonton, AB T5N 0Y9', operatingModel: 'For profit' },
  },
  '12345546': {
    name: 'SUNNYSIDE LICENCED DAYHOME',
    id: '12345546',
    status: 'Licenced',
    type: 'Family day home',
    careTypes: 'Infant, Toddler',
    physicalAddress: ['1470 Macleod Trl SE', 'Calgary, Alberta T3S 0A7'],
    mailingAddress: ['12345 104 Avenue NW', 'Edmonton, AB T5N 0Y9'],
    contact: { name: 'Mellissa Smith', role: 'Director', phone: '780-345-2691' },
    email: 'mellissasmith@sunnyside.com',
    licensingOfficer: 'Lena Yen',
    regionalAuthority: '005 CALGARY',
    licenceHolder: { name: 'SUNNYSIDE DAYCARE PVT. LTD.', address: '12345 104 Avenue NW, Edmonton, AB T5N 0Y9', operatingModel: 'For profit' },
  },
};

export function getProgramDetail(id: string | null): ProgramDetail {
  if (id && PROGRAM_DETAILS[id]) return PROGRAM_DETAILS[id];
  const summary = id ? PROGRAMS.find((p) => p.id === id) : undefined;
  if (!summary) return PROGRAM_DETAILS['180012345'];
  // No authored detail record for this program — build a plausible one from its search summary.
  const [addressLine1, addressLine2] = summary.subtitle.split(', ').reduce<[string, string]>(
    (acc, part, i) => (i === 0 ? [part, acc[1]] : [acc[0], acc[1] ? `${acc[1]}, ${part}` : part]),
    ['', '']
  );
  return {
    name: summary.name.toUpperCase(),
    id: summary.id,
    status: summary.status,
    type: summary.programType,
    careTypes: 'Preschool',
    physicalAddress: [addressLine1, addressLine2],
    mailingAddress: [addressLine1, addressLine2],
    contact: { name: 'Fabiola Beach', role: 'Director', phone: '780-345-2691' },
    email: 'info@example.com',
    licensingOfficer: 'Lena Yen',
    regionalAuthority: '005 CALGARY',
    licenceHolder: { name: 'SUNNYSIDE DAYCARE PVT. LTD.', address: '12345 104 Avenue NW, Edmonton, AB T5N 0Y9', operatingModel: 'For profit' },
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
