/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FineService } from './fine.service';

describe('Service: Fine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FineService]
    });
  });

  it('should ...', inject([FineService], (service: FineService) => {
    expect(service).toBeTruthy();
  }));
});
