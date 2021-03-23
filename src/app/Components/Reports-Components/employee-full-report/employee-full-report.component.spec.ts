import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFullReportComponent } from './employee-full-report.component';

describe('EmployeeFullReportComponent', () => {
  let component: EmployeeFullReportComponent;
  let fixture: ComponentFixture<EmployeeFullReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFullReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFullReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
