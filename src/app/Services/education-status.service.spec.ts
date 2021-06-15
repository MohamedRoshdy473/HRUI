import { TestBed } from '@angular/core/testing';

import { EducationStatusService } from './education-status.service';

describe('EducationStatusService', () => {
  let service: EducationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
