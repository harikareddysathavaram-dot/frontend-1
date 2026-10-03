import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PolicyService } from '../../core/policy.service';
import { ClaimService } from '../../core/claim.service';
import { ToastService } from '../../core/toast.service';
import { Claim, Policy } from '../../core/models';
import { InrPipe } from '../../core/inr.pipe';
import { ClaimTableComponent } from '../../shared/claim-table/claim-table.component';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink, InrPipe, ClaimTableComponent],
  templateUrl: './employer-dashboard.component.html'
})
export class EmployerDashboardComponent {
  private policyService = inject(PolicyService);
  private claimService = inject(ClaimService);
  private toast = inject(ToastService);

  policies = signal<Policy[]>([]);
  claims = signal<Claim[]>([]);
  employees = signal<string[]>([]);
  form = { employee: '', incident: '', amount: null as number | null };

  withSurveyor = computed(() => this.claims().filter(c => c.status === 'Review pending').length);
  paidTotal = computed(() => this.claims().filter(c => c.status === 'Paid').reduce((t, c) => t + c.amount, 0));

  constructor() {
    this.policyService.getPolicies().subscribe(p => this.policies.set(p));
    this.claimService.getEmployees().subscribe(e => { this.employees.set(e); this.form.employee = e[0]; });
    this.loadClaims();
  }

  loadClaims(): void { this.claimService.getClaims().subscribe(c => this.claims.set(c)); }

  submitClaim(): void {
    if (!this.form.incident.trim() || !this.form.amount) return this.toast.show('Describe the incident and amount');
    this.claimService.submit({
      policyId: this.policies()[0].id, employee: this.form.employee,
      incident: this.form.incident.trim(), amount: this.form.amount
    }).subscribe(() => {
      this.toast.show('Claim sent to surveyor');
      this.form.incident = ''; this.form.amount = null;
      this.loadClaims();
    });
  }
}
