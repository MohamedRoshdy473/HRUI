import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeavesTypeComponent } from './edit-leaves-type.component';

describe('EditLeavesTypeComponent', () => {
  let component: EditLeavesTypeComponent;
  let fixture: ComponentFixture<EditLeavesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeavesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeavesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
