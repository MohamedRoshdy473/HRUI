import { TestBed } from '@angular/core/testing';

import { TrainingProfessionService } from './training-profession.service';

describe('TrainingProfessionService', () => {
  let service: TrainingProfessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingProfessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
