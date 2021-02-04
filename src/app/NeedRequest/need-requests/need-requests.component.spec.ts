import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedRequestsComponent } from './need-requests.component';

describe('NeedRequestsComponent', () => {
  let component: NeedRequestsComponent;
  let fixture: ComponentFixture<NeedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
