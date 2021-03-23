import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllPositionsComponent } from './display-all-positions.component';

describe('DisplayAllPositionsComponent', () => {
  let component: DisplayAllPositionsComponent;
  let fixture: ComponentFixture<DisplayAllPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAllPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
