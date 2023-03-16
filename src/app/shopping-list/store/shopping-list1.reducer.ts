import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Ingrediant } from 'app/shared/ingrediant.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ADD_INGREDIANT } from './shopping-list.actions';

export const shoppingList1FeatureKey = 'shoppingList1';

export interface State {
  ingrediants: Ingrediant[];
}

export const initialState: State = {
  ingrediants: [new Ingrediant('tomato', 15), new Ingrediant('bhindi', 20)],
};

export const reducer = createReducer(
  initialState,
  on(ADD_INGREDIANT, (state, action) => {
    return {
      ...state,
      ingrediants: [...state.ingrediants, action.ingediant],
    };
  })
);
