import { TestBed } from '@angular/core/testing';

import { RolepermissionserviceService } from './rolepermissionservice.service';

describe('RolepermissionserviceService', () => {
  let service: RolepermissionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolepermissionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
