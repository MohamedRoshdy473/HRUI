import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditneedRequestComponent } from './editneed-request.component';

describe('EditneedRequestComponent', () => {
  let component: EditneedRequestComponent;
  let fixture: ComponentFixture<EditneedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditneedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditneedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
