import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YearPickerServiceService {

  
  currentYear: Subject<number> = new BehaviorSubject<number>(new Date().getFullYear());
  private yearKey = "current-year";

  constructor() { }

  setYear(year: number): void {
    window.sessionStorage.removeItem(this.yearKey);
    window.sessionStorage.setItem(this.yearKey, year.toString());
  }

  getYear(): number {
    const year: string = window.sessionStorage.getItem(this.yearKey);
    return Number.parseInt(year);
  }

  update(newYear: number) {
    this.currentYear.next(newYear);
  }
}
