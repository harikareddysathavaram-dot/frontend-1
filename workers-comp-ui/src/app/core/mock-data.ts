import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Claim, Employee, EmployerSummary, Plan, Policy, SurveyorSummary } from './models';

/** Runs fn after a short delay so mock calls behave like HTTP calls. */
export function mockCall<T>(fn: () => T): Observable<T> {
  return of(null).pipe(delay(250), map(fn));
}

export const PLANS: Plan[] = [
  { id: 1, name: 'Essential', audience: 'Small teams getting started', medical: '₹5 lakh', wage: '60% of wages', death: '₹10 lakh', rate: [2400, 2000] },
  { id: 2, name: 'Standard', audience: 'Most growing employers', medical: '₹10 lakh', wage: '75% of wages', death: '₹20 lakh', rate: [3600, 3100], popular: true },
  { id: 3, name: 'Premier', audience: 'High-risk or large workforces', medical: '₹25 lakh', wage: '100% of wages', death: '₹40 lakh', rate: [5200, 4500] }
];

const DESIGNATIONS = ['Operator', 'Warehouse lead', 'Safety officer', 'Driver', 'Technician', 'Loader'];
const POOL: Employee[] = [
  ['Farhan Ali', 'Machine operator'], ['Lakshmi Pillai', 'Supervisor'], ['Rohit Verma', 'Driver'], ['Neha Kulkarni', 'Packer'],
  ['Arjun Patel', 'Electrician'], ['Sunita Devi', 'Quality checker'], ['Vikram Singh', 'Welder'], ['Pooja Menon', 'Store keeper']
].map(([name, designation]) => ({ name, designation }));

const SEED_EMPLOYERS: EmployerSummary[] = [
  { company: 'Sahyadri Textiles', employees: 240, policies: 2, approved: 5, rejected: 1, pending: 1, employeeList: POOL },
  { company: 'Bluepeak Constructions', employees: 85, policies: 1, approved: 3, rejected: 2, pending: 0, employeeList: POOL },
  { company: 'Orchid Retail', employees: 60, policies: 1, approved: 1, rejected: 0, pending: 2, employeeList: POOL }
];
const SEED_SURVEYORS: SurveyorSummary[] = [
  { name: 'Ravi Menon', approved: 6, rejected: 2, pending: 1 },
  { name: 'Priya Iyer', approved: 3, rejected: 1, pending: 2 }
];

/** In-memory "database" shared by all mock services so the whole flow works. */
export const db = {
  employees: ['Anita Rao', 'Kiran Das', 'Meera Joshi', 'Suresh Nair', 'Divya Reddy', 'Imran Shaikh'],
  policies: [] as Policy[],
  claims: [] as Claim[]
};

export function buildEmployers(): EmployerSummary[] {
  const live = new Map<string, EmployerSummary & { ids: string[] }>();
  db.policies.forEach(p => {
    let o = live.get(p.company);
    if (!o) {
      o = { company: p.company, employees: 0, policies: 0, approved: 0, rejected: 0, pending: 0, ids: [],
            employeeList: db.employees.map((name, i) => ({ name, designation: DESIGNATIONS[i % 6] })) };
      live.set(p.company, o);
    }
    o.employees = Math.max(o.employees, p.employees);
    o.policies++;
    o.ids.push(p.id);
  });
  db.claims.forEach(c => {
    const o = [...live.values()].find(x => x.ids.includes(c.policyId));
    if (!o) return;
    if (c.status === 'Paid') o.approved++; else if (c.status === 'Rejected') o.rejected++; else o.pending++;
  });
  return [...SEED_EMPLOYERS, ...[...live.values()].map(({ ids, ...rest }) => rest)];
}

export function buildSurveyors(): SurveyorSummary[] {
  const n = (s: string) => db.claims.filter(c => c.status === s).length;
  return [...SEED_SURVEYORS, { name: 'Demo surveyor (you)', approved: n('Paid'), rejected: n('Rejected'), pending: n('Review pending') }];
}
