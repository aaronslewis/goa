import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkspaceShellComponent } from '../workspace-shell/workspace-shell.component';

export type NotifType = 'emergency' | 'important' | 'information';

export interface ScaleNotif {
  id: string;
  type: NotifType;
  program: string;
  heading: string;
  body: string;
  dismissed: boolean;
}

const PROGRAMS = [
  'Calamari Kindergarden', 'Tiramisu Daycare', 'MSPC Daycare', "Scott's Tots",
  'Dunder Mifflin Family Day Homes', 'Rainbow Bridge Child Care', 'Sunflower Learning Centre',
  'Little Explorers Daycare', 'Maple Grove Child Care', 'Bright Beginnings Preschool',
  'Riverside Kids Club', 'Meadowbrook Child Centre', 'Westview Family Day Home',
  'Northgate Early Learning', 'Pine Valley Preschool', 'Lakeside Child Care',
  'Summit Kids Academy', 'Golden Hills Daycare', 'Prairie View Child Care',
  'Bluebell Nursery School', 'Cedarvale Family Day Home', 'Aspen Grove Child Care',
  'Horizon Early Learning', 'Birchwood Daycare', 'Millcreek Kids Corner',
  'Creekside Child Care', 'Willowbrook Preschool', 'Elmwood Learning Centre',
  'Riverbend Family Day Home', 'Stonegate Child Care',
];

function makeNotifs(): ScaleNotif[] {
  const list: ScaleNotif[] = [];
  let id = 0;

  const add = (program: string, type: NotifType, heading: string, body: string) => {
    list.push({ id: `n${++id}`, type, program, heading, body, dismissed: false });
  };

  // Emergency (9 total)
  add(PROGRAMS[0],  'emergency', 'Licence expiring Oct 12, 2026',           'Immediate action required before expiry.');
  add(PROGRAMS[3],  'emergency', 'Non-compliance unsolved will be overdue soon',  'Both non-compliance items are past their resolution deadline.');
  add(PROGRAMS[7],  'emergency', 'Licence suspended — appeal window open',  'Facility licence suspended. Appeal must be filed within 10 business days.');
  add(PROGRAMS[11], 'emergency', 'Licence expiring Nov 3, 2026',            'Renewal application not yet received.');
  add(PROGRAMS[15], 'emergency', 'Critical incident — child injury reported','Incident occurred Jul 10, 2026. Report requires your sign-off.');
  add(PROGRAMS[18], 'emergency', 'Compliance order issued — response due',  'Program must respond to compliance order by Jul 22, 2026.');
  add(PROGRAMS[22], 'emergency', 'Licence expiring Sep 28, 2026',           'Program has not submitted renewal documentation.');
  add(PROGRAMS[25], 'emergency', 'Repeat non-compliance — escalation required','Third occurrence within 12 months. Escalation review needed.');
  add(PROGRAMS[29], 'emergency', 'Licence expiring Oct 5, 2026',            'Renewal reminder sent Jul 1. No response received.');

  // Important (24 total)
  const importantItems: [number, string, string][] = [
    [1,  'Critical incident report submitted',              'New incident report submitted Jul 14, 2026. Requires your review.'],
    [2,  'Non-compliance updated for review',               'A non-compliance record was updated and is awaiting your review.'],
    [4,  'Inspection due — no date scheduled',             'Annual inspection is overdue. Please schedule within 30 days.'],
    [5,  'Insurance documentation expires Sep 12, 2026',   'Provider has been notified. Confirmation pending.'],
    [6,  'Draft inspection to complete',                   'Inspection visit was completed. Draft report is unsaved.'],
    [8,  'Non-compliance submitted by program',            'Program has submitted evidence addressing the non-compliance.'],
    [9,  'Educator certification expiring',                'Lead educator certification expires Aug 31, 2026.'],
    [10, 'New complaint received',                         'A complaint was submitted on Jul 12, 2026. Initial review required.'],
    [12, 'Non-compliance — action required by Jul 30',     'Program acknowledged non-compliance. Resolution deadline approaching.'],
    [13, 'Program director changed — verify credentials',  'Program submitted a director change request on Jul 10, 2026.'],
    [14, 'Insurance documentation expires Aug 30, 2026',   'Expiry is within 45 days. Renewal not yet confirmed.'],
    [16, 'Inspection scheduled — preparation checklist',   'Inspection set for Jul 24, 2026. Checklist review required.'],
    [17, 'Complaint investigation — response due',         'Written response from program due Jul 18, 2026.'],
    [19, 'Capacity increase request submitted',            'Program requests capacity increase from 30 to 40 children.'],
    [20, 'Non-compliance — 15 days remaining',             'Non-compliance resolution deadline is Jul 29, 2026.'],
    [21, 'New staff record submitted for approval',        'Staff credential submitted on Jul 13, 2026. Pending approval.'],
    [23, 'Variance request submitted',                     'Program has submitted a variance request for outdoor play space.'],
    [24, 'Inspection report — signature required',         'Completed inspection report is awaiting your e-signature.'],
    [26, 'Educator-to-child ratio concern flagged',        'Anonymous complaint received Jul 11, 2026. Follow-up required.'],
    [27, 'Program relocation request',                     'Program has applied to relocate to a new address. Site inspection needed.'],
    [28, 'Non-compliance updated — evidence submitted',    'Program uploaded supporting documentation on Jul 14, 2026.'],
    [1,  'Second non-compliance opened',                   'New non-compliance opened following Jul 8, 2026 inspection.'],
    [3,  'Capacity review requested by program',           'Program requests a review of approved licensed capacity.'],
    [6,  'Background check result — review required',      'A staff background check returned a result requiring LO review.'],
  ];
  importantItems.forEach(([pi, h, b]) => add(PROGRAMS[pi], 'important', h, b));

  // Information (32 total)
  const infoItems: [number, string, string][] = [
    [0,  'New document uploaded',                          'Program uploaded Complaint Form on Jul 14, 2026.'],
    [1,  'Annual renewal submitted',                       'Renewal application received Jul 13, 2026. Review not yet started.'],
    [2,  'Inspection completed — report pending',          'Inspection visit completed Jul 9, 2026. Awaiting written report.'],
    [3,  'New document uploaded',                          'Program uploaded updated floor plan on Jul 12, 2026.'],
    [4,  'Staff roster updated',                           'Program submitted an updated staff roster on Jul 10, 2026.'],
    [5,  'Renewal application in progress',                'Program indicated renewal documentation will be submitted by Jul 25.'],
    [6,  'New contact person added',                       'Program added a new emergency contact on Jul 8, 2026.'],
    [7,  'Document request fulfilled',                     'Program uploaded requested insurance certificate on Jul 11, 2026.'],
    [8,  'Scheduled inspection reminder',                  'Inspection scheduled for Jul 30, 2026. Visit prep checklist available.'],
    [9,  'Non-compliance closed',                          'Non-compliance resolved and closed by program on Jul 7, 2026.'],
    [10, 'Annual renewal submitted',                       'Renewal package received. Documents under review.'],
    [11, 'New staff member added',                         'Staff record submitted for a newly hired early childhood educator.'],
    [12, 'Program profile updated',                        'Program updated operating hours effective Aug 1, 2026.'],
    [13, 'Complaint resolved — file closed',               'Complaint investigation concluded. File closed Jul 5, 2026.'],
    [14, 'Document uploaded',                              'Program uploaded updated emergency evacuation plan.'],
    [15, 'Scheduled inspection reminder',                  'Annual inspection due in 60 days. No date booked yet.'],
    [16, 'Non-compliance closed',                          'Evidence accepted. Non-compliance marked resolved Jul 6, 2026.'],
    [17, 'New document uploaded',                          'Program uploaded a signed parent communication form.'],
    [18, 'Annual renewal received',                        'Renewal application and all supporting documents received.'],
    [19, 'Staff certification renewed',                    'Lead educator renewed First Aid certification. On file.'],
    [20, 'Program profile updated',                        'Operating address verified and confirmed on Jul 9, 2026.'],
    [21, 'Document request fulfilled',                     'Program submitted updated liability insurance certificate.'],
    [22, 'New complaint received — FYI',                   'Low-priority complaint received. No immediate action required.'],
    [23, 'Renewal in progress',                            'Program confirmed renewal documentation will be ready by Jul 28.'],
    [24, 'Non-compliance closed',                          'Program resolved the non-compliance on Jul 3, 2026.'],
    [25, 'New document uploaded',                          'Updated health and safety policy uploaded Jul 11, 2026.'],
    [26, 'Staff roster updated',                           'Two new hires added to staff roster Jul 9, 2026.'],
    [27, 'Annual inspection completed',                    'Inspection report submitted. No issues identified.'],
    [28, 'Program profile updated',                        'Licensed capacity confirmed at 25 children.'],
    [29, 'New document uploaded',                          'Program uploaded signed fire inspection certificate.'],
    [0,  'Scheduled inspection — confirmed',               'Program confirmed availability for Jul 28, 2026 inspection.'],
    [5,  'Document request fulfilled',                     'Program submitted updated floor plan as requested.'],
  ];
  infoItems.forEach(([pi, h, b]) => add(PROGRAMS[pi], 'information', h, b));

  return list;
}

@Component({
  selector: 'notifications-scale',
  standalone: true,
  imports: [RouterLink, WorkspaceShellComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notifications-scale.component.html',
  styleUrl: './notifications-scale.component.scss',
})
export class NotificationsScaleComponent {
  readonly programs = PROGRAMS;
  allNotifs: ScaleNotif[] = makeNotifs();

  activeView: 'severity' | 'tabs' | 'summary' | 'program' = 'severity';

  // ── Severity group view ───────────────────────────────────────────────────
  openGroups: Record<string, boolean> = { emergency: true, important: false, information: false };

  toggleGroup(type: string): void {
    this.openGroups[type] = !this.openGroups[type];
  }

  get emergency(): ScaleNotif[] { return this.active.filter(n => n.type === 'emergency'); }
  get important(): ScaleNotif[]  { return this.active.filter(n => n.type === 'important'); }
  get information(): ScaleNotif[] { return this.active.filter(n => n.type === 'information'); }

  // ── Tabs + filter view ────────────────────────────────────────────────────
  activeTab: NotifType = 'emergency';
  filterProgram = 'all';
  tabsPageSize = 10;
  tabsPage: Record<NotifType, number> = { emergency: 0, important: 0, information: 0 };

  tabItems(type: NotifType): ScaleNotif[] {
    const base = this.active.filter(n => n.type === type &&
      (this.filterProgram === 'all' || n.program === this.filterProgram));
    const start = this.tabsPage[type] * this.tabsPageSize;
    return base.slice(start, start + this.tabsPageSize);
  }

  tabTotal(type: NotifType): number {
    return this.active.filter(n => n.type === type &&
      (this.filterProgram === 'all' || n.program === this.filterProgram)).length;
  }

  hasNextPage(type: NotifType): boolean {
    return (this.tabsPage[type] + 1) * this.tabsPageSize < this.tabTotal(type);
  }

  hasPrevPage(type: NotifType): boolean { return this.tabsPage[type] > 0; }

  nextPage(type: NotifType): void { if (this.hasNextPage(type)) this.tabsPage[type]++; }
  prevPage(type: NotifType): void { if (this.hasPrevPage(type)) this.tabsPage[type]--; }

  onFilterChange(event: Event): void {
    this.filterProgram = (event as CustomEvent).detail?.value ?? 'all';
    this.tabsPage = { emergency: 0, important: 0, information: 0 };
  }

  onTabChange(event: Event): void {
    this.activeTab = (event as CustomEvent).detail?.tab as NotifType ?? 'emergency';
  }

  // ── Smart summary view ────────────────────────────────────────────────────
  showAll = false;
  summaryTop = 5;

  get summaryItems(): ScaleNotif[] {
    const sorted = [...this.active].sort((a, b) => {
      const order: Record<NotifType, number> = { emergency: 0, important: 1, information: 2 };
      return order[a.type] - order[b.type];
    });
    return this.showAll ? sorted : sorted.slice(0, this.summaryTop);
  }

  // ── Program group view ────────────────────────────────────────────────────
  openPrograms: Record<string, boolean> = {};
  programSearch = '';

  get programsWithNotifs(): { name: string; items: ScaleNotif[] }[] {
    const severityRank: Record<NotifType, number> = { emergency: 0, important: 1, information: 2 };
    return this.programs
      .map(name => ({ name, items: this.active.filter(n => n.program === name) }))
      .filter(g => g.items.length > 0 &&
        (this.programSearch === '' || g.name.toLowerCase().includes(this.programSearch.toLowerCase())))
      .sort((a, b) => {
        const rankA = Math.min(...a.items.map(n => severityRank[n.type]));
        const rankB = Math.min(...b.items.map(n => severityRank[n.type]));
        return rankA - rankB;
      });
  }

  toggleProgramGroup(name: string): void {
    this.openPrograms[name] = !this.openPrograms[name];
  }

  onProgramSearch(event: Event): void {
    this.programSearch = (event.target as HTMLInputElement).value;
  }

  programIcon(items: ScaleNotif[]): string {
    if (items.some(n => n.type === 'emergency')) return 'warning';
    if (items.some(n => n.type === 'important')) return 'alert-circle';
    return 'information-circle';
  }

  programBadgeType(items: ScaleNotif[]): string {
    if (items.some(n => n.type === 'emergency')) return 'emergency';
    if (items.some(n => n.type === 'important')) return 'important';
    return 'information';
  }

  // ── Shared ────────────────────────────────────────────────────────────────
  get active(): ScaleNotif[] { return this.allNotifs.filter(n => !n.dismissed); }
  get total(): number { return this.active.length; }

  dismiss(id: string): void {
    const n = this.allNotifs.find(x => x.id === id);
    if (n) n.dismissed = true;
  }

  iconFor(type: NotifType): string {
    return { emergency: 'warning', important: 'alert-circle', information: 'information-circle' }[type];
  }

  containerTypeFor(type: NotifType): string {
    return { emergency: 'error', important: 'important', information: 'info' }[type];
  }

  setView(v: 'severity' | 'tabs' | 'summary' | 'program'): void { this.activeView = v; }
}
