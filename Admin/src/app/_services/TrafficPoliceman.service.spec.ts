/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrafficPolicemanService } from './TrafficPoliceman.service';

describe('Service: TrafficPoliceman', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrafficPolicemanService]
    });
  });

  it('should ...', inject([TrafficPolicemanService], (service: TrafficPolicemanService) => {
    expect(service).toBeTruthy();
  }));
});
