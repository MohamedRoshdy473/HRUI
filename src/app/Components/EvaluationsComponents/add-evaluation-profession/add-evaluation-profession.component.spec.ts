import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationProfessionComponent } from './add-evaluation-profession.component';

describe('AddEvaluationProfessionComponent', () => {
  let component: AddEvaluationProfessionComponent;
  let fixture: ComponentFixture<AddEvaluationProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEvaluationProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvaluationProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
