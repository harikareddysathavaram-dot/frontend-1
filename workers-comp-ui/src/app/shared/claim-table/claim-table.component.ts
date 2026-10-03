import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Claim } from '../../core/models';
import { InrPipe } from '../../core/inr.pipe';

@Component({
  selector: 'app-claim-table',
  standalone: true,
  imports: [InrPipe],
  templateUrl: './claim-table.component.html'
})
export class ClaimTableComponent {
  @Input() claims: Claim[] = [];
  @Input() showActions = false;
  @Input() emptyText = 'No claims yet.';
  @Output() decision = new EventEmitter<{ id: string; approve: boolean }>();
}
