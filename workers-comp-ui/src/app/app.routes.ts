import { Routes } from '@angular/router';
import { roleGuard } from './core/role.guard';
import { HomeComponent } from './pages/home/home.component';
import { BusinessInsuranceComponent } from './pages/business-insurance/business-insurance.component';
import { WorkersCompComponent } from './pages/workers-comp/workers-comp.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployerLayoutComponent } from './employer/employer-layout/employer-layout.component';
import { PremiumManagementComponent } from './employer/premium-management/premium-management.component';
import { PolicyFormComponent } from './employer/policy-form/policy-form.component';
import { EmployerDashboardComponent } from './employer/employer-dashboard/employer-dashboard.component';
import { SurveyorDashboardComponent } from './surveyor/surveyor-dashboard/surveyor-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'business-insurance', component: BusinessInsuranceComponent },
  { path: 'business-insurance/workers-comp', component: WorkersCompComponent },
  { path: 'business-insurance/not-started/:title', component: ComingSoonComponent },
  { path: 'auto-insurance', component: ComingSoonComponent, data: { title: 'Auto Insurance' } },
  { path: 'home-insurance', component: ComingSoonComponent, data: { title: 'Home Insurance' } },
  { path: 'employee-benefits', component: ComingSoonComponent, data: { title: 'Employee Benefits' } },
  { path: 'disaster-insurance', component: ComingSoonComponent, data: { title: 'Disaster Insurance' } },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'employer', component: EmployerLayoutComponent, canActivate: [roleGuard('Employer')],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'premium' },
      { path: 'premium', component: PremiumManagementComponent },
      { path: 'buy/:planId', component: PolicyFormComponent },
      { path: 'dashboard', component: EmployerDashboardComponent }
    ]
  },
  { path: 'surveyor', component: SurveyorDashboardComponent, canActivate: [roleGuard('Surveyor')] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [roleGuard('Admin')] },
  { path: '**', redirectTo: '' }
];
