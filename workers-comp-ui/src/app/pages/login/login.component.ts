import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
import { Role } from '../../core/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  email = 'demo@stagwell.in';
  password = 'password';

  signIn(role: Role): void {
    this.auth.login(this.email, this.password, role).subscribe({
      next: () => { this.toast.show('Signed in as ' + role); this.router.navigate([this.auth.homeRoute(role)]); },
      error: () => this.toast.show('Login failed. Check your details.')
    });
  }
}
