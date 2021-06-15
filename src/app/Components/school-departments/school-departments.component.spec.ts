import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDepartmentsComponent } from './school-departments.component';

describe('SchoolDepartmentsComponent', () => {
  let component: SchoolDepartmentsComponent;
  let fixture: ComponentFixture<SchoolDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
