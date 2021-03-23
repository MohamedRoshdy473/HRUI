import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProfessionsComponent } from './display-professions.component';

describe('DisplayProfessionsComponent', () => {
  let component: DisplayProfessionsComponent;
  let fixture: ComponentFixture<DisplayProfessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProfessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProfessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
