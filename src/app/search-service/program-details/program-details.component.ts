import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  GoabBadge,
  GoabIcon,
  GoabTabs,
  GoabTab,
  GoabContainer,
  GoabGrid,
} from '@abgov/angular-components';
import { SearchShellComponent } from '../shared/search-shell/search-shell.component';
import { getProgramDetail, ProgramDetail } from '../shared/search-data';

@Component({
  selector: 'app-program-details',
  standalone: true,
  imports: [GoabBadge, GoabIcon, GoabTabs, GoabTab, GoabContainer, GoabGrid, RouterLink, SearchShellComponent],
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.scss',
})
export class ProgramDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  searchValue = '';
  program!: ProgramDetail;

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.program = getProgramDetail(id);
    this.searchValue = `${this.program.id}: ${this.program.name}`;
  }
}
