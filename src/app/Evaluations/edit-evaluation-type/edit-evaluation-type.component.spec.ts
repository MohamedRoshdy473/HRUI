import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvaluationTypeComponent } from './edit-evaluation-type.component';

describe('EditEvaluationTypeComponent', () => {
  let component: EditEvaluationTypeComponent;
  let fixture: ComponentFixture<EditEvaluationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEvaluationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEvaluationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
