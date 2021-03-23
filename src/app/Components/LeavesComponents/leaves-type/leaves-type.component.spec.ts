import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesTypeComponent } from './leaves-type.component';

describe('LeavesTypeComponent', () => {
  let component: LeavesTypeComponent;
  let fixture: ComponentFixture<LeavesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
