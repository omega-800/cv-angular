import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    let monthNames: string[] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    if (value && !isNaN(Number(value))) {
      return value.getDate() + ". " + monthNames[value.getMonth()] + " " + value.getFullYear();
    }
    return "";
  }

}
