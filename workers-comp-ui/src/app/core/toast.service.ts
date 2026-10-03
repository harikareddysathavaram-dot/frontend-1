import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message = signal('');
  show(text: string): void {
    this.message.set(text);
    setTimeout(() => this.message.set(''), 2400);
  }
}
