import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExcuseComponent } from './report-excuse.component';

describe('ReportExcuseComponent', () => {
  let component: ReportExcuseComponent;
  let fixture: ComponentFixture<ReportExcuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExcuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExcuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
