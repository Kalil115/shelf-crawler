import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameshelfComponent } from './gameshelf.component';

describe('GameshelfComponent', () => {
  let component: GameshelfComponent;
  let fixture: ComponentFixture<GameshelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameshelfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameshelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
