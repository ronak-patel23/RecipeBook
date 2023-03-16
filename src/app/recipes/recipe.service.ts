import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
import { State, Store } from '@ngrx/store';
import { ADDTOSHOPPING_INGREDIANT } from 'app/shopping-list/store/shopping-list.actions';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipeChanged =  new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test Recipe',
  //     'This is simple Test ',
  //     ' /assets/img/Recipe_logo.jpeg',
  //     [new Ingrediant('Meat', 1), new Ingrediant('French Fries', 2)]
  //   ),
  //   new Recipe(
  //     'A new Test',
  //     'This is yummmy Test ',
  //     ' /assets/img/Recipe_logo.jpeg',
  //     [new Ingrediant('Buns', 2), new Ingrediant('Meat', 1)]
  //   ),
  // ];
  private recipes: Recipe[] = []
  getRecipe() {
    return this.recipes.slice();
  }
  getRecipes(index: number) {
    return this.recipes[index];
  }

  setRecipe(recipes :Recipe[]){
    
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())
  }

  constructor(private shoppingService: ShoppingService , private store : Store<{shoppingList: {ingrediant:Ingrediant} }>) {}

  addtoshoppingList(ingrediant: Ingrediant[]) {

    this.store.dispatch(ADDTOSHOPPING_INGREDIANT({ingediant:ingrediant}))
    // this.shoppingService.addIngrediants(ingrediant);
  }

  addRecipe(recipe:Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice())
  }
  updateRecipe(index:number, newRecipe : Recipe){
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index:number){
      this.recipes.splice(index,1);
      this.recipeChanged.next(this.recipes.slice());
  }
}
