import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Role, User } from './models';
import { mockCall } from './mock-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  user = signal<User | null>(JSON.parse(sessionStorage.getItem('user') || 'null'));

  login(email: string, password: string, role: Role): Observable<User> {
    const request$ = environment.useMock
      ? mockCall<User>(() => ({ id: 1, name: role + ' demo', email, role, token: 'mock-jwt-token' }))
      : this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password, role });  // Auth Service

    return request$.pipe(tap(u => { this.user.set(u); sessionStorage.setItem('user', JSON.stringify(u)); }));
  }

  logout(): void { this.user.set(null); sessionStorage.removeItem('user'); }

  homeRoute(role: Role): string { return role === 'Employer' ? '/employer' : role === 'Admin' ? '/admin' : '/surveyor'; }
}
