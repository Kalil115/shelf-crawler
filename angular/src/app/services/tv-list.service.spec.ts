import { TestBed } from '@angular/core/testing';

import { TvListService } from './tv-list.service';

describe('TvListService', () => {
  let service: TvListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
