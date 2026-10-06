export const ACCOUNT = {
  legalName: 'Nancy Trustworthy',
  organization: 'ABC Group Inc.',
  organizationType: 'Incorporated',
};

const PROGRAM_NAMES = [
  'ABC Day Care',
  'DEF Day Care',
  'HIJ Day Care',
  'KLM Day Care',
  'NOP Day Care',
  'QRS Day Care',
  'TUV Day Care',
  'WXYZ Day Care',
];

export const PROGRAMS: string[] = Array.from({ length: 31 }, (_, i) => {
  const name = PROGRAM_NAMES[i % PROGRAM_NAMES.length];
  const id = String(100000001 + i * 7).padStart(9, '0');
  return `${name} - ${id}`;
});

export interface VerificationSection {
  heading: string;
  body: string;
}

export const VERIFICATION_SECTIONS: VerificationSection[] = [
  {
    heading: 'Incorporated status',
    body: `${ACCOUNT.organization} is registered and in good standing with Alberta Corporate Registry, and is legally able to enter into this acknowledgement.`,
  },
  {
    heading: 'Signing authority',
    body: `I, ${ACCOUNT.legalName}, have the authority to sign on behalf of ${ACCOUNT.organization} and to bind the organization to the terms of this acknowledgement. If my authority changes, I will update it in the portal.`,
  },
  {
    heading: 'Audit of records',
    body: `The Government of Alberta may audit the records of ${ACCOUNT.organization} to confirm the information in this acknowledgement, including records held by Alberta Corporate Registry.`,
  },
];

export interface TermsSection {
  heading: string;
  clauses: string[];
}

export const TERMS: TermsSection[] = [
  {
    heading: 'Corporate authority',
    clauses: [
      'I am the applicable Super Admin and represent that I have the authority to bind the Licensed Organization, and I am accepting this acknowledgement for and on behalf of the Licensed Organization.',
      'I acknowledge that the Licensed Organization, and I as its authorized representative, are responsible for compliance with these terms and with the use of the Portal by anyone we give access to.',
      'I acknowledge that any access I provide to an additional authorized representative of the Licensed Organization will be granted and maintained by me through the Portal.',
    ],
  },
  {
    heading: 'Representations and warranties',
    clauses: [
      'All information entered into the Portal by me or an additional authorized representative is accurate and complete to the best of our knowledge.',
      'Any child, parent or guardian information entered into the Portal was collected by the Licensed Organization with the knowledge of the individual and in line with the Child Care Accountability Program.',
      'I have the proper authority, approval or consent, as the case may be, to disclose and enter the information into the Portal for the purposes of the Child Care Accountability Program.',
      'I understand that the Licensed Organization is subject to the Freedom of Information and Protection of Privacy Act when it shares information with the Government of Alberta through the Portal.',
      'I will not share Portal access credentials, and I will remove access for any individual who no longer requires it.',
      'I understand that the Government of Alberta is not responsible for the management of any information the Licensed Organization keeps outside the Portal.',
    ],
  },
  {
    heading: 'Indemnity',
    clauses: [
      'The Licensed Organization agrees to indemnify and hold harmless the Government of Alberta, its employees and agents from any claims, damages, costs and expenses arising from a breach of these terms by the Licensed Organization or its authorized representatives.',
      'This indemnity survives the end of the Licensed Organization’s access to the Portal.',
    ],
  },
];
