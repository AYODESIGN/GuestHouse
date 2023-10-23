import { TestBed } from '@angular/core/testing';

import { TokenStorgeService } from './token-storge.service';

describe('TokenStorgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenStorgeService = TestBed.get(TokenStorgeService);
    expect(service).toBeTruthy();
  });
});
