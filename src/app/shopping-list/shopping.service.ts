import { Injectable, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.model';
import { UPDATE_INGREDIANT } from './store/shopping-list.actions';
@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor(
    private store: Store<{ shoppingList: { ingrediant: Ingrediant } }>
  ) {}

  ingrediantChange = new Subject<Ingrediant[]>();
  startedEditing = new Subject<number>();
  private ingrediant: Ingrediant[] = [
    new Ingrediant('tomato', 15),
    new Ingrediant('bhindi', 20),
  ];

  getIngerdiants(index: number) {
    return this.ingrediant[index];
  }

  getIngrediant() {
    return this.ingrediant.slice();
  }

  addIngrediant(ingrediant: Ingrediant) {
    this.ingrediant.push(ingrediant);
    this.ingrediantChange.next(this.ingrediant.slice());
  }
  addIngrediants(ingrediant: Ingrediant[]) {
    for (let ing of ingrediant) {
      this.addIngrediant(ing);
    }
    this.ingrediantChange.next(this.ingrediant.slice());
  }
  updateIngrediant(index: number, newIngrediant: Ingrediant) {
    this.ingrediant[index] = newIngrediant;
    this.ingrediantChange.next(this.ingrediant.slice());
    
  }

  deleteIngrediant(index: number) {
    this.ingrediant.splice(index, 1);
    this.ingrediantChange.next(this.ingrediant.slice());
  }
}
