import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dtCurrency'
})
export class DTCurrencyPipe implements PipeTransform {
  transform(value: number | null): string | null {
    if (value === null) {
      return null;
    }
    // Replace this with your logic to format the number with the DT currency symbol
    return value.toLocaleString('fr-TN', { style: 'currency', currency: 'TND' });
  }
}
