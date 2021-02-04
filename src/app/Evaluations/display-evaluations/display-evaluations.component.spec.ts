import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEvaluationsComponent } from './display-evaluations.component';

describe('DisplayEvaluationsComponent', () => {
  let component: DisplayEvaluationsComponent;
  let fixture: ComponentFixture<DisplayEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayEvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
