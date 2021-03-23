import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllEmployeesComponent } from './display-all-employees.component';

describe('DisplayAllEmployeesComponent', () => {
  let component: DisplayAllEmployeesComponent;
  let fixture: ComponentFixture<DisplayAllEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAllEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
