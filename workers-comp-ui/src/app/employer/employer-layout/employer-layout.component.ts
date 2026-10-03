import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employer-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './employer-layout.component.html',
  styleUrl: './employer-layout.component.css'
})
export class EmployerLayoutComponent {}
