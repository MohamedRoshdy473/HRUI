import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeavesTypeComponent } from './add-leaves-type.component';

describe('AddLeavesTypeComponent', () => {
  let component: AddLeavesTypeComponent;
  let fixture: ComponentFixture<AddLeavesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeavesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeavesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
