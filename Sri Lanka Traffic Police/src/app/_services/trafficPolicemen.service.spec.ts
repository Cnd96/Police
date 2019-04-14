/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrafficPolicemenService } from './trafficPolicemen.service';

describe('Service: TrafficPolicemen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrafficPolicemenService]
    });
  });

  it('should ...', inject([TrafficPolicemenService], (service: TrafficPolicemenService) => {
    expect(service).toBeTruthy();
  }));
});
