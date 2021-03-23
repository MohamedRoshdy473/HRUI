import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceINComponent } from './attendance-in.component';

describe('AttendanceINComponent', () => {
  let component: AttendanceINComponent;
  let fixture: ComponentFixture<AttendanceINComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceINComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
