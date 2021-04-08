import { TestBed } from '@angular/core/testing';

import { MovieshelfItemService } from './movieshelf-item.service';

describe('MovieshelfItemService', () => {
  let service: MovieshelfItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieshelfItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
