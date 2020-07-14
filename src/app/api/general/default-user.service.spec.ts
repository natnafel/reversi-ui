import { TestBed } from '@angular/core/testing';

import { DefaultUserService } from './default-user.service';

describe('DefaultUserService', () => {
  let service: DefaultUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
