import { TestBed } from '@angular/core/testing';

import { MemoserviceService } from '../service/memoservice.service';

describe('MemoserviceService', () => {
  let service: MemoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
