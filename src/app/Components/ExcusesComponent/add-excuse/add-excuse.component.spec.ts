import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcuseComponent } from './add-excuse.component';

describe('AddExcuseComponent', () => {
  let component: AddExcuseComponent;
  let fixture: ComponentFixture<AddExcuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExcuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExcuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
