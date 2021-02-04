import { TestBed } from '@angular/core/testing';

import { NeedRequestService } from './need-request.service';

describe('NeedRequestService', () => {
  let service: NeedRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeedRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
