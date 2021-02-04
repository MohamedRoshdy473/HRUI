import { TestBed } from '@angular/core/testing';

import { EvaluationTypeService } from './evaluation-type.service';

describe('EvaluationTypeService', () => {
  let service: EvaluationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
