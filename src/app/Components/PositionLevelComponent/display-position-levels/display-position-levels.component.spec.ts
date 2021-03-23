import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPositionLevelsComponent } from './display-position-levels.component';

describe('DisplayPositionLevelsComponent', () => {
  let component: DisplayPositionLevelsComponent;
  let fixture: ComponentFixture<DisplayPositionLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPositionLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPositionLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
