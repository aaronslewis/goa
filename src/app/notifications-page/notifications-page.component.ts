import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WorkspaceShellComponent } from '../workspace-shell/workspace-shell.component';

export type NotifSeverity = 'emergency' | 'important' | 'information';
export type NotifTag = 'new' | 'urgent' | 'action-required' | null;

export interface PageNotif {
  id: string;
  severity: NotifSeverity;
  title: string;
  body: string;
  program: string;
  tag: NotifTag;
  timestamp: Date;
  read: boolean;
}

function daysAgo(d: number, h = 9, m = 0): Date {
  const now = new Date();
  now.setDate(now.getDate() - d);
  now.setHours(h, m, 0, 0);
  return now;
}

function minsAgo(mins: number): Date {
  return new Date(Date.now() - mins * 60 * 1000);
}

const ALL_NOTIFS: PageNotif[] = [
  // Today
  {
    id: 'p1', severity: 'emergency', tag: 'urgent', read: false,
    title: 'Licence expiring Oct 12, 2026',
    body: 'Immediate action is required before the expiry date.',
    program: 'Calamari Kindergarden', timestamp: minsAgo(5),
  },
  {
    id: 'p2', severity: 'emergency', tag: 'urgent', read: false,
    title: 'Non-compliance unsolved will be overdue soon',
    body: 'Both non-compliance items are past their resolution deadline.',
    program: "Scott's Tots", timestamp: minsAgo(22),
  },
  {
    id: 'p3', severity: 'important', tag: 'action-required', read: false,
    title: 'Critical incident report submitted',
    body: 'New incident report submitted and requires your review.',
    program: 'Tiramisu Daycare', timestamp: minsAgo(45),
  },
  {
    id: 'p4', severity: 'important', tag: 'new', read: false,
    title: 'Non-compliance updated for review',
    body: 'A non-compliance record was updated and is awaiting your review.',
    program: 'Dunder Mifflin Family Day Homes', timestamp: minsAgo(90),
  },
  {
    id: 'p5', severity: 'information', tag: 'new', read: false,
    title: 'New document uploaded',
    body: 'Program uploaded Complaint Form.',
    program: 'Calamari Kindergarden', timestamp: minsAgo(130),
  },
  {
    id: 'p6', severity: 'important', tag: 'action-required', read: false,
    title: 'Inspection due — no date scheduled',
    body: 'Annual inspection is overdue. Please schedule within 30 days.',
    program: 'MSPC Daycare', timestamp: minsAgo(200),
  },
  {
    id: 'p7', severity: 'information', tag: null, read: true,
    title: 'Staff roster updated',
    body: 'Program submitted an updated staff roster.',
    program: 'Little Explorers Daycare', timestamp: minsAgo(300),
  },

  // Yesterday
  {
    id: 'p8', severity: 'emergency', tag: 'urgent', read: true,
    title: 'Critical incident — child injury reported',
    body: 'Incident occurred Jul 10, 2026. Report requires your sign-off.',
    program: 'Lakeside Child Care', timestamp: daysAgo(1, 14, 30),
  },
  {
    id: 'p9', severity: 'important', tag: 'action-required', read: true,
    title: 'Complaint investigation — response due',
    body: 'Written response from program due Jul 18, 2026.',
    program: 'Horizon Early Learning', timestamp: daysAgo(1, 11, 15),
  },
  {
    id: 'p10', severity: 'important', tag: 'new', read: true,
    title: 'Educator certification expiring',
    body: 'Lead educator certification expires Aug 31, 2026.',
    program: 'Maple Grove Child Care', timestamp: daysAgo(1, 10, 0),
  },
  {
    id: 'p11', severity: 'information', tag: null, read: true,
    title: 'Annual renewal submitted',
    body: 'Renewal application received. Review not yet started.',
    program: 'Tiramisu Daycare', timestamp: daysAgo(1, 8, 45),
  },

  // This week
  {
    id: 'p12', severity: 'emergency', tag: 'urgent', read: true,
    title: 'Compliance order issued — response due',
    body: 'Program must respond to compliance order by Jul 22, 2026.',
    program: 'Prairie View Child Care', timestamp: daysAgo(3, 15, 0),
  },
  {
    id: 'p13', severity: 'important', tag: 'action-required', read: true,
    title: 'Inspection report — signature required',
    body: 'Completed inspection report is awaiting your e-signature.',
    program: 'Birchwood Daycare', timestamp: daysAgo(3, 9, 30),
  },
  {
    id: 'p14', severity: 'important', tag: 'new', read: true,
    title: 'New complaint received',
    body: 'A complaint was submitted on Jul 12, 2026. Initial review required.',
    program: 'Northgate Early Learning', timestamp: daysAgo(4, 13, 0),
  },
  {
    id: 'p15', severity: 'information', tag: null, read: true,
    title: 'Non-compliance closed',
    body: 'Non-compliance resolved and closed by program.',
    program: 'Sunflower Learning Centre', timestamp: daysAgo(5, 11, 0),
  },
  {
    id: 'p16', severity: 'information', tag: null, read: true,
    title: 'Inspection completed — report pending',
    body: 'Inspection visit completed. Awaiting written report.',
    program: 'Golden Hills Daycare', timestamp: daysAgo(6, 10, 15),
  },

  // Older
  {
    id: 'p17', severity: 'emergency', tag: 'urgent', read: true,
    title: 'Repeat non-compliance — escalation required',
    body: 'Third occurrence within 12 months. Escalation review needed.',
    program: 'Creekside Child Care', timestamp: daysAgo(10, 9, 0),
  },
  {
    id: 'p18', severity: 'important', tag: 'action-required', read: true,
    title: 'Capacity increase request submitted',
    body: 'Program requests capacity increase from 30 to 40 children.',
    program: 'Willowbrook Preschool', timestamp: daysAgo(12, 14, 0),
  },
  {
    id: 'p19', severity: 'information', tag: null, read: true,
    title: 'Complaint resolved — file closed',
    body: 'Complaint investigation concluded. File closed.',
    program: 'Elmwood Learning Centre', timestamp: daysAgo(15, 10, 0),
  },
  {
    id: 'p20', severity: 'information', tag: null, read: true,
    title: 'Staff certification renewed',
    body: 'Lead educator renewed First Aid certification. On file.',
    program: 'Riverbend Family Day Home', timestamp: daysAgo(20, 11, 0),
  },
];

export interface DateGroup {
  label: string;
  items: PageNotif[];
}

@Component({
  selector: 'notifications-page',
  standalone: true,
  imports: [WorkspaceShellComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.scss',
})
export class NotificationsPageComponent {
  activeTab: 'unread' | 'urgent' | 'all' = 'unread';
  notifs: PageNotif[] = ALL_NOTIFS;

  get unreadCount(): number { return this.notifs.filter(n => !n.read).length; }
  get urgentCount(): number { return this.notifs.filter(n => n.tag === 'urgent').length; }

  get filtered(): PageNotif[] {
    if (this.activeTab === 'unread') return this.notifs.filter(n => !n.read);
    if (this.activeTab === 'urgent') return this.notifs.filter(n => n.tag === 'urgent');
    return this.notifs;
  }

  get dateGroups(): DateGroup[] {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday); startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const startOfWeek = new Date(startOfToday); startOfWeek.setDate(startOfWeek.getDate() - 7);

    const groups: { key: string; label: string; items: PageNotif[] }[] = [
      { key: 'today', label: 'Today', items: [] },
      { key: 'yesterday', label: 'Yesterday', items: [] },
      { key: 'week', label: 'This week', items: [] },
      { key: 'older', label: 'Older', items: [] },
    ];

    for (const n of this.filtered) {
      if (n.timestamp >= startOfToday) groups[0].items.push(n);
      else if (n.timestamp >= startOfYesterday) groups[1].items.push(n);
      else if (n.timestamp >= startOfWeek) groups[2].items.push(n);
      else groups[3].items.push(n);
    }

    return groups.filter(g => g.items.length > 0);
  }

  markAllRead(): void {
    this.notifs.forEach(n => n.read = true);
  }

  markRead(id: string): void {
    const n = this.notifs.find(x => x.id === id);
    if (n) n.read = true;
  }

  setTab(tab: 'unread' | 'urgent' | 'all'): void { this.activeTab = tab; }

  relativeTime(date: Date): string {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} h ago`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  tagLabel(tag: NotifTag): string {
    if (tag === 'new') return 'New';
    if (tag === 'urgent') return 'Urgent';
    if (tag === 'action-required') return 'Action required';
    return '';
  }

  tagClass(tag: NotifTag): string {
    if (tag === 'urgent') return 'tag tag--urgent';
    if (tag === 'action-required') return 'tag tag--action';
    return 'tag tag--new';
  }
}
