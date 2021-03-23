import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNeedRequestEmpComponent } from './edit-need-request-emp.component';

describe('EditNeedRequestEmpComponent', () => {
  let component: EditNeedRequestEmpComponent;
  let fixture: ComponentFixture<EditNeedRequestEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNeedRequestEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNeedRequestEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
