import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css']
})
export class YearPickerComponent implements OnInit {

  currentYear: number;

  constructor() {
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  nextYear() {
    this.currentYear += 1; 
  }

  preYear() {
    this.currentYear -= 1; 
  }
}
