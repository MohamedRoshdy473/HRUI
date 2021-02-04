import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviosExcuseComponent } from './previos-excuse.component';

describe('PreviosExcuseComponent', () => {
  let component: PreviosExcuseComponent;
  let fixture: ComponentFixture<PreviosExcuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviosExcuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviosExcuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
