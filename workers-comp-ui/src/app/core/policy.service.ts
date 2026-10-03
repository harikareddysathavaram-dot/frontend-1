import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BuyPolicyRequest, Plan, Policy } from './models';
import { PLANS, db, mockCall } from './mock-data';

@Injectable({ providedIn: 'root' })
export class PolicyService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  getPlans(): Observable<Plan[]> {
    return environment.useMock ? mockCall(() => PLANS) : this.http.get<Plan[]>(`${this.api}/policy/plans`);
  }

  getPolicies(): Observable<Policy[]> {
    return environment.useMock ? mockCall(() => [...db.policies]) : this.http.get<Policy[]>(`${this.api}/policy/policies`);
  }

  buy(req: BuyPolicyRequest): Observable<Policy> {
    if (!environment.useMock) return this.http.post<Policy>(`${this.api}/policy/policies`, req);
    return mockCall(() => {
      const plan = PLANS.find(p => p.id === req.planId)!;
      const policy: Policy = {
        id: 'WC-' + (7781 + db.policies.length), company: req.company, industry: req.industry, plan: plan.name,
        employees: req.employees, premium: plan.rate[req.band] * req.employees, startDate: req.startDate, status: 'Active'
      };
      db.policies.push(policy);
      return policy;
    });
  }
}
