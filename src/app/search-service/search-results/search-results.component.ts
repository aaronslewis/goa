import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  GoabBadge,
  GoabTable,
  GoabTableSortHeader,
  GoabPagination,
  GoabDropdown,
  GoabDropdownItem,
  GoabMenuButton,
  GoabMenuAction,
} from '@abgov/angular-components';
import {
  GoabTableOnSortDetail,
  GoabPaginationOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabMenuButtonOnActionDetail,
} from '@abgov/ui-components-common';
import { SearchShellComponent } from '../shared/search-shell/search-shell.component';
import { OrgResult, ProgramResult, UserResult, searchOrganizations, searchPrograms, searchUsers } from '../shared/search-data';

type Category = 'organizations' | 'programs' | 'users';

function sortRows<T>(rows: T[], key: keyof T | null, dir: number): T[] {
  if (!key) return rows;
  return [...rows].sort((a, b) => {
    const av = String(a[key]).toLowerCase();
    const bv = String(b[key]).toLowerCase();
    return av < bv ? -dir : av > bv ? dir : 0;
  });
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    GoabBadge,
    GoabTable,
    GoabTableSortHeader,
    GoabPagination,
    GoabDropdown,
    GoabDropdownItem,
    GoabMenuButton,
    GoabMenuAction,
    RouterLink,
    SearchShellComponent,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  category: Category = 'organizations';
  query = '';

  pageNumber = 1;
  perPageCount = 10;

  sortBy: string | null = null;
  sortDir = 1;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const cat = params.get('category');
      if (cat === 'organizations' || cat === 'programs' || cat === 'users') this.category = cat;
      this.pageNumber = 1;
      this.sortBy = null;
    });
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') ?? '';
    });
  }

  get categoryLabel(): string {
    switch (this.category) {
      case 'organizations': return 'Licence Holder Organizations';
      case 'programs': return 'Programs';
      case 'users': return 'Users';
    }
  }

  get allOrgs(): OrgResult[] {
    return this.query ? searchOrganizations(this.query) : [];
  }

  get allPrograms(): ProgramResult[] {
    return this.query ? searchPrograms(this.query) : [];
  }

  get allUsers(): UserResult[] {
    return this.query ? searchUsers(this.query) : [];
  }

  get totalCount(): number {
    switch (this.category) {
      case 'organizations': return this.allOrgs.length;
      case 'programs': return this.allPrograms.length;
      case 'users': return this.allUsers.length;
    }
  }

  get pagedOrgs(): OrgResult[] {
    return this.paginate(sortRows(this.allOrgs, this.sortBy as keyof OrgResult, this.sortDir));
  }

  get pagedPrograms(): ProgramResult[] {
    return this.paginate(sortRows(this.allPrograms, this.sortBy as keyof ProgramResult, this.sortDir));
  }

  get pagedUsers(): UserResult[] {
    return this.paginate(sortRows(this.allUsers, this.sortBy as keyof UserResult, this.sortDir));
  }

  private paginate<T>(rows: T[]): T[] {
    const start = (this.pageNumber - 1) * this.perPageCount;
    return rows.slice(start, start + this.perPageCount);
  }

  sortDirFor(key: string): 'asc' | 'desc' | 'none' {
    if (this.sortBy !== key) return 'none';
    return this.sortDir === 1 ? 'asc' : 'desc';
  }

  onSort(detail: GoabTableOnSortDetail): void {
    this.sortBy = detail.sortBy;
    this.sortDir = detail.sortDir;
  }

  onPageChange(detail: GoabPaginationOnChangeDetail): void {
    this.pageNumber = detail.page;
  }

  onPerPageChange(detail: GoabDropdownOnChangeDetail): void {
    this.perPageCount = Number(detail.value);
    this.pageNumber = 1;
  }

  goToOrganization(org: OrgResult): void {
    this.router.navigate(['/search-service/organization-details'], { queryParams: { id: org.id } });
  }

  goToProgram(program: ProgramResult): void {
    this.router.navigate(['/search-service/program-details'], { queryParams: { id: program.id } });
  }

  goToUser(user: UserResult): void {
    this.router.navigate(['/search-service/user-profile'], { queryParams: { id: user.id } });
  }

  get otherCategories(): { category: Category; label: string; count: number }[] {
    const all: { category: Category; label: string; count: number }[] = [
      { category: 'organizations', label: 'Licence Holder Organizations', count: this.allOrgs.length },
      { category: 'programs', label: 'Programs', count: this.allPrograms.length },
      { category: 'users', label: 'Users', count: this.allUsers.length },
    ];
    return all.filter((c) => c.category !== this.category);
  }

  onCategorySwitch(detail: GoabMenuButtonOnActionDetail): void {
    this.router.navigate(['/search-service/results', detail.action], { queryParams: { q: this.query } });
  }
}
