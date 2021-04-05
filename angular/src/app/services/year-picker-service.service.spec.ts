import { TestBed } from '@angular/core/testing';

import { YearPickerServiceService } from './year-picker.service';

describe('YearPickerServiceService', () => {
  let service: YearPickerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearPickerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
