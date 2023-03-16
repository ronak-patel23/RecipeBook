import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Ingrediant } from 'app/shared/ingrediant.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import {
  ADDTOSHOPPING_INGREDIANT,
  ADD_INGREDIANT,
  DELETE_INGREDIANT,
  SELECT_INGREDIANT,
  UPDATE_INGREDIANT,

} from './shopping-list.actions';

export const shoppingList1FeatureKey = 'shoppingList1';

export interface State {
  ingrediants: Ingrediant[];
  editedIndex: number 
}

export const initialState: State = {
  ingrediants: [new Ingrediant('tomato', 15), new Ingrediant('bhindi', 20)],
  editedIndex : -1
};

export const reducer = createReducer(
  initialState,
  on(ADD_INGREDIANT, (state, action) => {
    return {
      ...state,
      ingrediants: [...state.ingrediants, action.ingediant],
    };
  }),
  on(ADDTOSHOPPING_INGREDIANT, (state, action) => {
    return {
      ...state,
      ingrediants: [...state.ingrediants, ...action.ingediant],
    };
  }),
  on(UPDATE_INGREDIANT, (state, action) => {
    const ingrediant = state.ingrediants[action.index];
    const upadatedIngrediant = {
      ...ingrediant,
      ...action.ingediant,
    };
    const upadatedIngrediants = [...state.ingrediants];
    upadatedIngrediants[action.index] = upadatedIngrediant;
    return {
      ...state,
      ingrediants: [...upadatedIngrediants],
    };
  }),
  on(DELETE_INGREDIANT, (state, action) => {
    return {
      ...state,
      ingrediants: state.ingrediants.filter((ig, igIndex) => {
        return igIndex !== action.index;
      }),
    };
  }),
  on(SELECT_INGREDIANT, (state, action) => {
    return {
      ...state,
      editedIndex:action.index
    };
  })
);
