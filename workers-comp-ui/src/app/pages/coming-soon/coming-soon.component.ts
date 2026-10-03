import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})
export class ComingSoonComponent {
  private route = inject(ActivatedRoute);
  private params = toSignal(this.route.paramMap);
  private data = toSignal(this.route.data);
  title = computed(() => this.params()?.get('title') ?? this.data()?.['title'] ?? 'This product');
}
