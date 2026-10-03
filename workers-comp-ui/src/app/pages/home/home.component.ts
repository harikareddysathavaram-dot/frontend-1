import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ selector: 'app-home', standalone: true, imports: [RouterLink], templateUrl: './home.component.html' })
export class HomeComponent {
  others = [
    { icon: '🚗', title: 'Auto Insurance', path: '/auto-insurance' },
    { icon: '🏠', title: 'Home Insurance', path: '/home-insurance' },
    { icon: '🧑‍🤝‍🧑', title: 'Employee Benefits', path: '/employee-benefits' },
    { icon: '🌊', title: 'Disaster Insurance', path: '/disaster-insurance' }
  ];
}
