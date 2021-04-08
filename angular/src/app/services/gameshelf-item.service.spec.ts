import { TestBed } from '@angular/core/testing';

import { GameshelfItemService } from './gameshelf-item.service';

describe('GameshelfItemService', () => {
  let service: GameshelfItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameshelfItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
