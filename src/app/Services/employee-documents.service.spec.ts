import { TestBed } from '@angular/core/testing';

import { EmployeeDocumentsService } from './employee-documents.service';

describe('EmployeeDocumentsService', () => {
  let service: EmployeeDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
