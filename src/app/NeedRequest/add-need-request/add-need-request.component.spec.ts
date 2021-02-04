import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNeedRequestComponent } from './add-need-request.component';

describe('AddNeedRequestComponent', () => {
  let component: AddNeedRequestComponent;
  let fixture: ComponentFixture<AddNeedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNeedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNeedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
