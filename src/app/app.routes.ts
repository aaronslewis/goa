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
  // Fallback for unknown routes. A specific route, once added, takes
  // precedence over this wildcard.
  { path: '**', redirectTo: '' },
];
