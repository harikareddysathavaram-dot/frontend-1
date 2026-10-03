import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'inr', standalone: true })
export class InrPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return '₹' + Math.round(value ?? 0).toLocaleString('en-IN');
  }
}
