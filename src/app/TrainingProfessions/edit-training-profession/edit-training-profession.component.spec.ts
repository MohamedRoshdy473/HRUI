import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingProfessionComponent } from './edit-training-profession.component';

describe('EditTrainingProfessionComponent', () => {
  let component: EditTrainingProfessionComponent;
  let fixture: ComponentFixture<EditTrainingProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrainingProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainingProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
