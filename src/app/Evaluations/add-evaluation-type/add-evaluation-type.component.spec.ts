import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationTypeComponent } from './add-evaluation-type.component';

describe('AddEvaluationTypeComponent', () => {
  let component: AddEvaluationTypeComponent;
  let fixture: ComponentFixture<AddEvaluationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEvaluationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvaluationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
