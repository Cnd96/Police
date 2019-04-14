/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OicDivisionService } from './oicDivision.service';

describe('Service: OicDivision', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OicDivisionService]
    });
  });

  it('should ...', inject([OicDivisionService], (service: OicDivisionService) => {
    expect(service).toBeTruthy();
  }));
});
