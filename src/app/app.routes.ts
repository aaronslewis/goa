import { Routes } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HelpCentreComponent } from './help-centre/help-centre.component';
import { SageWidgetComponent } from './sage-widget/sage-widget.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainMenu2Component } from './main-menu-2/main-menu-2.component';
import { MainMenu3Component } from './main-menu-3/main-menu-3.component';
import { ProviderPortalMenuComponent } from './provider-portal-menu/provider-portal-menu.component';
import { PlatformPrototypesComponent } from './platform-prototypes/platform-prototypes.component';
import { UserAccessManagementComponent } from './user-access-management/user-access-management.component';
import { MyProgramsComponent } from './my-programs/my-programs.component';
import { EcdsDashboardComponent } from './ecds-dashboard/ecds-dashboard.component';
import { GenericDashboardComponent } from './generic-dashboard/generic-dashboard.component';
import { EcdsDashboardV2Component } from './ecds-dashboard-v2/ecds-dashboard-v2.component';
import { NotificationsScaleComponent } from './notifications-scale/notifications-scale.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { GoaUserManagementComponent } from './goa-user-management/goa-user-management.component';
import { HubShellComponent } from './notifications-hub/hub-shell.component';
import { HubHomeComponent } from './notifications-hub/home/hub-home.component';
import { HubNotificationsPageComponent } from './notifications-hub/notifications-page/hub-notifications-page.component';
import { ProgramDetailsComponent } from './search-service/program-details/program-details.component';
import { SearchLandingComponent } from './search-service/search-landing/search-landing.component';
import { SearchResultsComponent } from './search-service/search-results/search-results.component';
import { OrganizationDetailsComponent } from './search-service/organization-details/organization-details.component';
import { AcknowledgementShellComponent } from './acknowledgement/shell/acknowledgement-shell.component';
import { AcknowledgementTaskListComponent } from './acknowledgement/task-list/task-list.component';
import { DeclarationComponent } from './acknowledgement/declaration/declaration.component';
import { VerificationComponent } from './acknowledgement/verification/verification.component';
import { TermsComponent } from './acknowledgement/terms/terms.component';
import { ConfirmationComponent } from './acknowledgement/confirmation/confirmation.component';
import { AcknowledgementV2ShellComponent } from './acknowledgement-v2/shell/acknowledgement-shell.component';
import { AcknowledgementV2TaskListComponent } from './acknowledgement-v2/task-list/task-list.component';
import { DeclarationV2Component } from './acknowledgement-v2/declaration/declaration.component';
import { VerificationV2Component } from './acknowledgement-v2/verification/verification.component';
import { TermsV2Component } from './acknowledgement-v2/terms/terms.component';
import { ConfirmationV2Component } from './acknowledgement-v2/confirmation/confirmation.component';
import { UserProfileComponent } from './search-service/user-profile/user-profile.component';

@Component({
  standalone: true,
  selector: 'help-centre-page',
  imports: [HelpCentreComponent, SageWidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <help-centre (returningUserTrigger)="sage.startReturningUser()"></help-centre>
    <sage-widget #sage></sage-widget>
  `,
})
class HelpCentrePage {}

export const routes: Routes = [
  { path: '', component: PlatformPrototypesComponent, title: 'Platform prototypes', pathMatch: 'full' },
  { path: 'home-page-design', component: MyProgramsComponent, title: 'My Programs — Home Page Design' },
  { path: 'ecds-dashboard', component: EcdsDashboardComponent, title: 'ECDS Dashboard — Home' },
  { path: 'generic-dashboard', component: GenericDashboardComponent, title: 'Staff dashboard' },
  { path: 'ecds-dashboard-v2', component: EcdsDashboardV2Component, title: 'ECDS Dashboard v2 — Home' },
  { path: 'notifications-scale', component: NotificationsScaleComponent, title: 'Notifications — Scaling exploration' },
  { path: 'notifications', component: NotificationsPageComponent, title: 'All notifications' },
  {
    path: 'notifications-hub',
    component: HubShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HubHomeComponent, title: 'Home — Notifications hub' },
      { path: 'notifications', component: HubNotificationsPageComponent, title: 'Notifications — Notifications hub' },
    ],
  },
  { path: 'help-centre', component: HelpCentrePage, title: 'Help Centre' },
  { path: 'menu', component: MainMenuComponent, title: 'Workspace menu' },
  { path: 'menu-2', component: MainMenu2Component, title: 'Workspace menu (variation)' },
  { path: 'menu-3', component: MainMenu3Component, title: 'Workspace menu (child icons)' },
  { path: 'provider-portal-menu', component: ProviderPortalMenuComponent, title: 'Provider portal menu' },
  {
    path: 'user-access-management',
    component: UserAccessManagementComponent,
    title: 'User Access Management',
  },
  {
    path: 'goa-user-management',
    component: GoaUserManagementComponent,
    title: 'GOA User Management — Search',
  },
  {
    path: 'search-service',
    component: SearchLandingComponent,
    title: 'Search — Search service',
  },
  {
    path: 'search-service/results/:category',
    component: SearchResultsComponent,
    title: 'Search results — Search service',
  },
  {
    path: 'search-service/program-details',
    component: ProgramDetailsComponent,
    title: 'Program details — Search service',
  },
  {
    path: 'search-service/organization-details',
    component: OrganizationDetailsComponent,
    title: 'Organization details — Search service',
  },
  {
    path: 'search-service/user-profile',
    component: UserProfileComponent,
    title: 'User profile — Search service',
  },
  {
    path: 'acknowledgement',
    component: AcknowledgementShellComponent,
    children: [
      { path: '', component: AcknowledgementTaskListComponent, title: 'Acknowledgement — Child Care Licensing Portal' },
      { path: 'declaration', component: DeclarationComponent, title: 'Declaration — Child Care Licensing Portal' },
      { path: 'verification', component: VerificationComponent, title: 'Verification — Child Care Licensing Portal' },
      { path: 'terms', component: TermsComponent, title: 'Acknowledgement terms — Child Care Licensing Portal' },
      { path: 'confirmation', component: ConfirmationComponent, title: 'Acknowledgement submitted — Child Care Licensing Portal' },
    ],
  },
  {
    path: 'acknowledgement-v2',
    component: AcknowledgementV2ShellComponent,
    children: [
      { path: '', component: AcknowledgementV2TaskListComponent, title: 'Acknowledgement (v2) — Child Care Licensing Portal' },
      { path: 'declaration', component: DeclarationV2Component, title: 'Declaration (v2) — Child Care Licensing Portal' },
      { path: 'verification', component: VerificationV2Component, title: 'Verification (v2) — Child Care Licensing Portal' },
      { path: 'terms', component: TermsV2Component, title: 'Acknowledgement terms (v2) — Child Care Licensing Portal' },
      { path: 'confirmation', component: ConfirmationV2Component, title: 'Acknowledgement submitted (v2) — Child Care Licensing Portal' },
    ],
  },
  // Fallback for unknown routes. A specific route, once added, takes
  // precedence over this wildcard.
  { path: '**', redirectTo: '' },
];
