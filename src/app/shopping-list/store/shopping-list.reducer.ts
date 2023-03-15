import { Action } from '@ngrx/store';
import { Ingrediant } from 'app/shared/ingrediant.model';
import * as ShoppingListActions from './shopping-list.actions' 

const initialState = {
  ingrediant: [new Ingrediant('tomato', 15), new Ingrediant('bhindi', 20)],
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngrediant) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIANT:
      return {
        ...state,
        ingrediant: [...state.ingrediant, action.payload],
      };
  }
}
