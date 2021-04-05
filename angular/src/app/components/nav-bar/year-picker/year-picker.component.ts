import { Component, OnInit } from '@angular/core';
import { YearPickerServiceService } from 'src/app/services/year-picker.service';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css']
})
export class YearPickerComponent implements OnInit {

  currentYear: number;

  constructor(private yearPickerService: YearPickerServiceService) {
  }

  ngOnInit(): void {
    this.yearPickerService.setYear(new Date().getFullYear());
    this.currentYear = this.yearPickerService.getYear();
  }

  nextYear() {
    this.currentYear += 1;
    this.yearPickerService.setYear(this.currentYear); 
  }

  preYear() {
    this.currentYear -= 1; 
    this.yearPickerService.setYear(this.currentYear); 
  }
  
}
