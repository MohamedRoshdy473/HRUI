import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousLeavesComponent } from './previous-leaves.component';

describe('PreviousLeavesComponent', () => {
  let component: PreviousLeavesComponent;
  let fixture: ComponentFixture<PreviousLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
