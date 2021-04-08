import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshelfComponent } from './tvshelf.component';

describe('TvshelfComponent', () => {
  let component: TvshelfComponent;
  let fixture: ComponentFixture<TvshelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvshelfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
