import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvaluationProfessionComponent } from './edit-evaluation-profession.component';

describe('EditEvaluationProfessionComponent', () => {
  let component: EditEvaluationProfessionComponent;
  let fixture: ComponentFixture<EditEvaluationProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEvaluationProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEvaluationProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
