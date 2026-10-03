import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PolicyService } from '../../core/policy.service';
import { ToastService } from '../../core/toast.service';
import { Plan } from '../../core/models';
import { InrPipe } from '../../core/inr.pipe';

@Component({
  selector: 'app-policy-form',
  standalone: true,
  imports: [FormsModule, RouterLink, InrPipe],
  templateUrl: './policy-form.component.html'
})
export class PolicyFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private policyService = inject(PolicyService);
  private toast = inject(ToastService);

  plan = signal<Plan | undefined>(undefined);
  band = Number(this.route.snapshot.queryParamMap.get('band') ?? 0);
  industries = ['Logistics', 'Manufacturing', 'Construction', 'Retail', 'Offices'];

  form = {
    company: '', industry: 'Logistics', employees: this.band ? 150 : 40,
    startDate: new Date().toISOString().slice(0, 10), contactEmail: 'hr@company.in', confirmed: false
  };

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('planId'));
    this.policyService.getPlans().subscribe(plans => this.plan.set(plans.find(p => p.id === id)));
  }

  get rate(): number { return this.plan()?.rate[this.band] ?? 0; }
  get total(): number { return this.rate * (Number(this.form.employees) || 0); }

  submit(): void {
    const f = this.form, n = Number(f.employees);
    if (!f.company.trim()) return this.toast.show('Enter your company name');
    if (!f.confirmed) return this.toast.show('Tick the confirmation box');
    if (this.band === 0 && n > 100) return this.toast.show('This band is for up to 100 employees');
    if (this.band === 1 && n <= 100) return this.toast.show('This band is for more than 100 employees');

    this.policyService.buy({
      company: f.company.trim(), industry: f.industry, planId: this.plan()!.id, band: this.band,
      employees: n, startDate: f.startDate, contactEmail: f.contactEmail
    }).subscribe(() => {
      this.toast.show('Policy active. Your policy record is saved.');
      this.router.navigate(['/employer/dashboard']);
    });
  }
}
