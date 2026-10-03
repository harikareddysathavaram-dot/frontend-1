import { Component, computed, inject, signal } from '@angular/core';
import { AdminService } from '../../core/admin.service';
import { EmployerSummary, SurveyorSummary } from '../../core/models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {
  private admin = inject(AdminService);

  employers = signal<EmployerSummary[]>([]);
  surveyors = signal<SurveyorSummary[]>([]);
  Math = Math;
  selectedName = signal<string | null>(null);

  selected = computed(() => this.employers().find(e => e.company === this.selectedName()));
  totals = computed(() => {
    const sum = (k: 'policies' | 'approved' | 'rejected' | 'pending') => this.employers().reduce((t, e) => t + e[k], 0);
    return { policies: sum('policies'), approved: sum('approved'), rejected: sum('rejected'), pending: sum('pending') };
  });

  constructor() {
    this.admin.getEmployers().subscribe(e => this.employers.set(e));
    this.admin.getSurveyors().subscribe(s => this.surveyors.set(s));
  }
}
