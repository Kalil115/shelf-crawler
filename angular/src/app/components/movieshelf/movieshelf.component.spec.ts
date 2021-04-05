import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieshelfComponent } from './movieshelf.component';

describe('MovieshelfComponent', () => {
  let component: MovieshelfComponent;
  let fixture: ComponentFixture<MovieshelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieshelfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieshelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
