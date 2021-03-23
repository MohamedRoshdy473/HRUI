import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNeedRequestEmpComponent } from './add-need-request-emp.component';

describe('AddNeedRequestEmpComponent', () => {
  let component: AddNeedRequestEmpComponent;
  let fixture: ComponentFixture<AddNeedRequestEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNeedRequestEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNeedRequestEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
