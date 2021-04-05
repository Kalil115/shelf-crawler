import { TestBed } from '@angular/core/testing';

import { YearPickerService } from './year-picker.service';

describe('YearPickerServiceService', () => {
  let service: YearPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
