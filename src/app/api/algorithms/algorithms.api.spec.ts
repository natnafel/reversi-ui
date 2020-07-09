import { TestBed } from '@angular/core/testing';

import { AlgorithmsApi } from './algorithms.api';

describe('AlgorithmsService', () => {
  let service: AlgorithmsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
