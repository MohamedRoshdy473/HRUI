import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstructorComponent } from './edit-instructor.component';

describe('EditInstructorComponent', () => {
  let component: EditInstructorComponent;
  let fixture: ComponentFixture<EditInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
