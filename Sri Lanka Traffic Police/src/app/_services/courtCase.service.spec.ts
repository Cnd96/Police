/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourtCaseService } from './courtCase.service';

describe('Service: CourtCase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourtCaseService]
    });
  });

  it('should ...', inject([CourtCaseService], (service: CourtCaseService) => {
    expect(service).toBeTruthy();
  }));
});
