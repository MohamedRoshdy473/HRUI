import { TestBed } from '@angular/core/testing';

import { EvaluationProfessionService } from './evaluation-profession.service';

describe('EvaluationProfessionService', () => {
  let service: EvaluationProfessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationProfessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
