import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({ selector: 'app-workers-comp', standalone: true, imports: [RouterLink], templateUrl: './workers-comp.component.html' })
export class WorkersCompComponent {
  private auth = inject(AuthService);
  cta = computed(() => (this.auth.user()?.role === 'Employer' ? '/employer' : '/login'));

  faqs = [
    { q: 'Who needs this cover?', a: 'Most employers with staff on payroll. It protects the company from large injury-related costs.' },
    { q: 'How is the premium decided?', a: 'By plan, number of employees and the volume band. Larger teams get a lower rate per employee.' },
    { q: 'Who verifies a claim?', a: 'A surveyor reviews each claim and approves or rejects it. The employer sees the result straight away.' }
  ];
}
