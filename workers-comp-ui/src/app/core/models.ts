export type Role = 'Employer' | 'Surveyor' | 'Admin';
export type ClaimStatus = 'Review pending' | 'Paid' | 'Rejected';

export interface User { id: number; name: string; email: string; role: Role; token: string; }
export interface Plan { id: number; name: string; audience: string; medical: string; wage: string; death: string; rate: [number, number]; popular?: boolean; }
export interface Policy { id: string; company: string; industry: string; plan: string; employees: number; premium: number; startDate: string; status: 'Active' | 'Pending' | 'Expired'; }
export interface BuyPolicyRequest { company: string; industry: string; planId: number; band: number; employees: number; startDate: string; contactEmail: string; }
export interface Claim { id: string; policyId: string; employee: string; incident: string; amount: number; status: ClaimStatus; }
export interface NewClaim { policyId: string; employee: string; incident: string; amount: number; }
export interface Employee { name: string; designation: string; }
export interface EmployerSummary { company: string; employees: number; policies: number; approved: number; rejected: number; pending: number; employeeList: Employee[]; }
export interface SurveyorSummary { name: string; approved: number; rejected: number; pending: number; }
