import { TestBed } from '@angular/core/testing';

import { SchoolDepartmentsService } from './school-departments.service';

describe('SchoolDepartmentsService', () => {
  let service: SchoolDepartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolDepartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
