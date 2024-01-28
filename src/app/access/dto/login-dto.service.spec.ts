import { TestBed } from '@angular/core/testing';

import { LoginDtoService } from './login-dto.service';

describe('LoginDtoService', () => {
  let service: LoginDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
