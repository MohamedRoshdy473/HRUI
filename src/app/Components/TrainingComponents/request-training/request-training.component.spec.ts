import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTrainingComponent } from './request-training.component';

describe('RequestTrainingComponent', () => {
  let component: RequestTrainingComponent;
  let fixture: ComponentFixture<RequestTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
