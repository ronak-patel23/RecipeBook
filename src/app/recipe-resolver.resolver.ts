import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorageService,
    private RecipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const receipes = this.RecipeService.getRecipe();
    if (receipes.length === 0) {
      return this.dataStorage.fetchData();
    } else {
      return receipes;
    }
  }
}
