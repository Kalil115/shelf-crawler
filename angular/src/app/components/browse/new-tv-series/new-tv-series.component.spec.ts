import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTvSeriesComponent } from './new-tv-series.component';

describe('NewTvSeriesComponent', () => {
  let component: NewTvSeriesComponent;
  let fixture: ComponentFixture<NewTvSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTvSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTvSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
