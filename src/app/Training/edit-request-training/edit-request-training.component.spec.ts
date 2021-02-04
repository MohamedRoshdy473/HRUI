import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestTrainingComponent } from './edit-request-training.component';

describe('EditRequestTrainingComponent', () => {
  let component: EditRequestTrainingComponent;
  let fixture: ComponentFixture<EditRequestTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRequestTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRequestTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
