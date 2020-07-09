import { TestBed } from '@angular/core/testing';

import { ProtocolApi } from './protocol.api';

describe('ProtocolService', () => {
  let service: ProtocolApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtocolApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
