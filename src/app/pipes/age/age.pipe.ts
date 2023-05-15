import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let date = new Date(value);
    let now = new Date();

    const startYear = date.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = now.getFullYear() - startYear;
    let monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = now.getDate() - date.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[date.getMonth()];
    }

    let hourDiff = now.getHours() - date.getHours();
    if (hourDiff < 0) {
      hourDiff += 24;
    }

    let minuteDiff = now.getMinutes() - date.getMinutes();
    if (minuteDiff < 0) {
      minuteDiff += 60;
    }

    let secDiff = now.getSeconds() - date.getSeconds();
    if (secDiff < 0) {
      secDiff += 60;
    }
    return yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D '/* + hourDiff + 'h ' + minuteDiff + 'm ' + secDiff + 's '*/;
  }
}
