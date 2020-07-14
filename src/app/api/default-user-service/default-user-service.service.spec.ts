import { TestBed } from '@angular/core/testing';

import { DefaultUserServiceService } from './default-user-service.service';

describe('DefaultUserServiceService', () => {
  let service: DefaultUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
