import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EmployerSummary, SurveyorSummary } from './models';
import { buildEmployers, buildSurveyors, mockCall } from './mock-data';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  getEmployers(): Observable<EmployerSummary[]> {
    return environment.useMock ? mockCall(buildEmployers) : this.http.get<EmployerSummary[]>(`${this.api}/admin/employers`);
  }

  getSurveyors(): Observable<SurveyorSummary[]> {
    return environment.useMock ? mockCall(buildSurveyors) : this.http.get<SurveyorSummary[]>(`${this.api}/admin/surveyors`);
  }
}
