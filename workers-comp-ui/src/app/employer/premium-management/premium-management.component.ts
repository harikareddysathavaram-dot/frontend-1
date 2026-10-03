import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PolicyService } from '../../core/policy.service';
import { Plan } from '../../core/models';
import { InrPipe } from '../../core/inr.pipe';

@Component({
  selector: 'app-premium-management',
  standalone: true,
  imports: [RouterLink, InrPipe],
  templateUrl: './premium-management.component.html',
  styleUrl: './premium-management.component.css'
})
export class PremiumManagementComponent {
  private policyService = inject(PolicyService);

  plans = signal<Plan[]>([]);
  band = signal<number | null>(null);   // 0 = up to 100 employees, 1 = more than 100
  bands = [
    { label: 'Up to 100 employees', hint: 'Small and mid-size teams' },
    { label: 'More than 100 employees', hint: 'Volume rates apply' }
  ];

  constructor() { this.policyService.getPlans().subscribe(p => this.plans.set(p)); }
}
