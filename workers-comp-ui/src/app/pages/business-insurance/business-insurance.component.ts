import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ selector: 'app-business-insurance', standalone: true, imports: [RouterLink], templateUrl: './business-insurance.component.html' })
export class BusinessInsuranceComponent {
  covers = [
    { icon: '🏢', title: 'Business Owners Policy', desc: 'One package for property and liability', live: false },
    { icon: '⏸️', title: 'Business Interruption Coverage', desc: 'Replaces income when operations stop', live: false },
    { icon: '🏭', title: 'Commercial Property Insurance', desc: 'Buildings, stock and equipment', live: false },
    { icon: '🦺', title: 'Workers Compensation', desc: 'Injury cover for your employees', live: true },
    { icon: '⚖️', title: 'Employment Practices Liability', desc: 'Claims from hiring and workplace disputes', live: false }
  ];
}
