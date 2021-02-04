import { TestBed } from '@angular/core/testing';

import { ExcuseService } from './excuse.service';

describe('ExcuseService', () => {
  let service: ExcuseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcuseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
