import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationProfessionComponent } from './evaluation-profession.component';

describe('EvaluationProfessionComponent', () => {
  let component: EvaluationProfessionComponent;
  let fixture: ComponentFixture<EvaluationProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
