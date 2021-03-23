import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvaluationComponent } from './edit-evaluation.component';

describe('EditEvaluationComponent', () => {
  let component: EditEvaluationComponent;
  let fixture: ComponentFixture<EditEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
