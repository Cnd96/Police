/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PoliceStationService } from './policeStation.service';

describe('Service: PoliceStation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoliceStationService]
    });
  });

  it('should ...', inject([PoliceStationService], (service: PoliceStationService) => {
    expect(service).toBeTruthy();
  }));
});
