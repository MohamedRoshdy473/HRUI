import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProfessionComponent } from './training-profession.component';

describe('TrainingProfessionComponent', () => {
  let component: TrainingProfessionComponent;
  let fixture: ComponentFixture<TrainingProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
