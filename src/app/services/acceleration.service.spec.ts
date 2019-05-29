import { TestBed } from '@angular/core/testing';

import { AccelerationService } from './acceleration.service';

describe('AccelerationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccelerationService = TestBed.get(AccelerationService);
    expect(service).toBeTruthy();
  });
});
