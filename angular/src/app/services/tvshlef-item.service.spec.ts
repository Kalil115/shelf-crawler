import { TestBed } from '@angular/core/testing';

import { TvshelfItemService } from './tvshlef-item.service';

describe('TvshelfItemService', () => {
  let service: TvshelfItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvshelfItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
