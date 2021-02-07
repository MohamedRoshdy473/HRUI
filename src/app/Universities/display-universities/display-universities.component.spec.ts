import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUniversitiesComponent } from './display-universities.component';

describe('DisplayUniversitiesComponent', () => {
  let component: DisplayUniversitiesComponent;
  let fixture: ComponentFixture<DisplayUniversitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayUniversitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
