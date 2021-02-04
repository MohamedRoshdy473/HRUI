import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExcusesComponent } from './all-excuses.component';

describe('AllExcusesComponent', () => {
  let component: AllExcusesComponent;
  let fixture: ComponentFixture<AllExcusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllExcusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExcusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
