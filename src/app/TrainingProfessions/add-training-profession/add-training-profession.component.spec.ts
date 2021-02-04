import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingProfessionComponent } from './add-training-profession.component';

describe('AddTrainingProfessionComponent', () => {
  let component: AddTrainingProfessionComponent;
  let fixture: ComponentFixture<AddTrainingProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainingProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
