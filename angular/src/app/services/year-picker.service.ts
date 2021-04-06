import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YearPickerService {
   
  currentYear: Subject<number> = new BehaviorSubject<number>(new Date().getFullYear());
 
  constructor() { }

  update(newYear: number) {
    this.currentYear.next(newYear);
  }
}
