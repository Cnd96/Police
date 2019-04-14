/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OffenceService } from './offence.service';

describe('Service: Offence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffenceService]
    });
  });

  it('should ...', inject([OffenceService], (service: OffenceService) => {
    expect(service).toBeTruthy();
  }));
});
