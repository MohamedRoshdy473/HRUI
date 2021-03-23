import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFacultydepartmentsComponent } from './display-facultydepartments.component';

describe('DisplayFacultydepartmentsComponent', () => {
  let component: DisplayFacultydepartmentsComponent;
  let fixture: ComponentFixture<DisplayFacultydepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFacultydepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFacultydepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
