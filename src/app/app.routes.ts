import { Routes } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HelpCentreComponent } from './help-centre/help-centre.component';
import { SageWidgetComponent } from './sage-widget/sage-widget.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { UserAccessManagementComponent } from './user-access-management/user-access-management.component';
import { MyProgramsComponent } from './my-programs/my-programs.component';

@Component({
  standalone: true,
  selector: 'help-centre-page',
  imports: [HelpCentreComponent, SageWidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <help-centre></help-centre>
    <sage-widget></sage-widget>
  `,
})
class HelpCentrePage {}

export const routes: Routes = [
  { path: '', redirectTo: 'home-page-design', pathMatch: 'full' },
  { path: 'home-page-design', component: MyProgramsComponent, title: 'My Programs — Home Page Design' },
  { path: 'help-centre', component: HelpCentrePage, title: 'Help Centre' },
  { path: 'menu', component: MainMenuComponent, title: 'Workspace menu' },
  {
    path: 'user-access-management',
    component: UserAccessManagementComponent,
    title: 'User Access Management',
  },
];
