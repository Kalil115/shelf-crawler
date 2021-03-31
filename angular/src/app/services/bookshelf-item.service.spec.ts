import { TestBed } from '@angular/core/testing';

import { BookshelfItemService } from './bookshelf-item.service';

describe('BookshelfItemService', () => {
  let service: BookshelfItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookshelfItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
