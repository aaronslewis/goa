import { Routes } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HelpCentreComponent } from './help-centre/help-centre.component';
import { SageWidgetComponent } from './sage-widget/sage-widget.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainMenu2Component } from './main-menu-2/main-menu-2.component';
import { EligibilityCheckComponent } from './eligibility-check/eligibility-check.component';

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
  { path: '', redirectTo: 'help-centre', pathMatch: 'full' },
  { path: 'help-centre', component: HelpCentrePage, title: 'Help Centre' },
  { path: 'menu', component: MainMenuComponent, title: 'Workspace menu' },
  { path: 'menu-2', component: MainMenu2Component, title: 'Workspace menu (variation)' },
  { path: 'eligibility-check', component: EligibilityCheckComponent, title: 'Check your eligibility' },
];
