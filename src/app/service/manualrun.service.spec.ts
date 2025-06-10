import { TestBed } from '@angular/core/testing';

import { ManualrunService } from '../service/manualrun.service';

describe('ManualrunService', () => {
  let service: ManualrunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualrunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
