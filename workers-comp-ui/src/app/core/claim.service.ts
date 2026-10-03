import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Claim, NewClaim } from './models';
import { db, mockCall } from './mock-data';

@Injectable({ providedIn: 'root' })
export class ClaimService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  getEmployees(): Observable<string[]> {
    return environment.useMock ? mockCall(() => db.employees) : this.http.get<string[]>(`${this.api}/customer/employees`);
  }

  getClaims(): Observable<Claim[]> {
    return environment.useMock ? mockCall(() => [...db.claims]) : this.http.get<Claim[]>(`${this.api}/claims`);
  }

  submit(c: NewClaim): Observable<Claim> {
    if (!environment.useMock) return this.http.post<Claim>(`${this.api}/claims`, c);
    return mockCall(() => {
      const claim: Claim = { id: 'CLM-' + (1042 + db.claims.length), ...c, status: 'Review pending' };
      db.claims.push(claim);
      return claim;
    });
  }

  /** Surveyor decision. Approved claims are paid automatically (capstone shortcut). */
  decide(id: string, approve: boolean): Observable<Claim> {
    if (!environment.useMock) return this.http.put<Claim>(`${this.api}/claims/${id}/decision`, { approve });
    return mockCall(() => {
      const claim = db.claims.find(c => c.id === id)!;
      claim.status = approve ? 'Paid' : 'Rejected';
      return claim;
    });
  }
}
