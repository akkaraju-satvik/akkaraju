import { TestBed } from '@angular/core/testing';

import { BlogsGuard } from './blogs.guard';

describe('BlogsGuard', () => {
  let guard: BlogsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlogsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
