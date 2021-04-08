import { TestBed } from '@angular/core/testing';

import { TvshelfService } from './tvshelf.service';

describe('TvshelfService', () => {
  let service: TvshelfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvshelfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
