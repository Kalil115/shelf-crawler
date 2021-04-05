import { TestBed } from '@angular/core/testing';

import { MovieshelfService } from './movieshelf.service';

describe('MovieshelfServiceService', () => {
  let service: MovieshelfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieshelfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
