import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLeavesComponent } from './report-leaves.component';

describe('ReportLeavesComponent', () => {
  let component: ReportLeavesComponent;
  let fixture: ComponentFixture<ReportLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
