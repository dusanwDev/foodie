import { TestBed } from '@angular/core/testing';

import { RestaurantGuardGuard } from './restaurant-guard.guard';

describe('RestaurantGuardGuard', () => {
  let guard: RestaurantGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RestaurantGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
