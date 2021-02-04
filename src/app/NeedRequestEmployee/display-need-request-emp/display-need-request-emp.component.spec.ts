import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNeedRequestEmpComponent } from './display-need-request-emp.component';

describe('DisplayNeedRequestEmpComponent', () => {
  let component: DisplayNeedRequestEmpComponent;
  let fixture: ComponentFixture<DisplayNeedRequestEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNeedRequestEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNeedRequestEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
