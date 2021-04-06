import { Component, OnInit } from '@angular/core';
import { YearPickerService } from 'src/app/services/year-picker.service';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css']
})
export class YearPickerComponent implements OnInit {

  currentYear: number;

  constructor(private yearPickerService: YearPickerService) {
  }

  ngOnInit(): void {
    this.yearPickerService.currentYear.subscribe(data => this.currentYear = data);
  }

  nextYear() {
    this.yearPickerService.update(this.currentYear + 1); 
  }

  preYear() {
    this.yearPickerService.update(this.currentYear -1); 
  }
  
}
