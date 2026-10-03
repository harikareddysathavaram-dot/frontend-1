import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  links = [
    { label: 'Business Insurance', path: '/business-insurance' },
    { label: 'Auto Insurance', path: '/auto-insurance' },
    { label: 'Home Insurance', path: '/home-insurance' },
    { label: 'Employee Benefits', path: '/employee-benefits' },
    { label: 'Disaster Insurance', path: '/disaster-insurance' },
    { label: 'About', path: '/about' }
  ];

  logout(): void { this.auth.logout(); this.router.navigate(['/']); }
}
