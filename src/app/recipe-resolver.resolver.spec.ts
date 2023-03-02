import { TestBed } from '@angular/core/testing';

import { RecipeResolverResolver } from './recipe-resolver.resolver';

describe('RecipeResolverResolver', () => {
  let resolver: RecipeResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RecipeResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
