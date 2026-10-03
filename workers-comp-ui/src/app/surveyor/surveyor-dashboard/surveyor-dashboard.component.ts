import { Component, computed, inject, signal } from '@angular/core';
import { ClaimService } from '../../core/claim.service';
import { ToastService } from '../../core/toast.service';
import { Claim } from '../../core/models';
import { InrPipe } from '../../core/inr.pipe';
import { ClaimTableComponent } from '../../shared/claim-table/claim-table.component';

@Component({
  selector: 'app-surveyor-dashboard',
  standalone: true,
  imports: [InrPipe, ClaimTableComponent],
  templateUrl: './surveyor-dashboard.component.html'
})
export class SurveyorDashboardComponent {
  private claimService = inject(ClaimService);
  private toast = inject(ToastService);

  claims = signal<Claim[]>([]);
  toReview = computed(() => this.claims().filter(c => c.status === 'Review pending').length);
  paid = computed(() => this.claims().filter(c => c.status === 'Paid'));
  rejected = computed(() => this.claims().filter(c => c.status === 'Rejected').length);
  paidTotal = computed(() => this.paid().reduce((t, c) => t + c.amount, 0));

  constructor() { this.load(); }

  load(): void { this.claimService.getClaims().subscribe(c => this.claims.set(c)); }

  decide(e: { id: string; approve: boolean }): void {
    this.claimService.decide(e.id, e.approve).subscribe(() => {
      this.toast.show(e.approve ? 'Approved. Payment recorded as paid.' : 'Claim rejected');
      this.load();
    });
  }
}
