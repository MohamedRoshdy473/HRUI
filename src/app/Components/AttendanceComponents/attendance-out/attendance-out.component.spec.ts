import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceOUTComponent } from './attendance-out.component';

describe('AttendanceOUTComponent', () => {
  let component: AttendanceOUTComponent;
  let fixture: ComponentFixture<AttendanceOUTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceOUTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceOUTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
