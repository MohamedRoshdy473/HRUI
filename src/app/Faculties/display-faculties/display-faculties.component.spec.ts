import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFacultiesComponent } from './display-faculties.component';

describe('DisplayFacultiesComponent', () => {
  let component: DisplayFacultiesComponent;
  let fixture: ComponentFixture<DisplayFacultiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFacultiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFacultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
