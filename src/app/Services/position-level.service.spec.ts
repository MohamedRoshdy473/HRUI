import { TestBed } from '@angular/core/testing';

import { PositionLevelService } from './position-level.service';

describe('PositionLevelService', () => {
  let service: PositionLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
