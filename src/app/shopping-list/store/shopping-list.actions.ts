import { Action, createAction, props } from "@ngrx/store";
import { Ingrediant } from "app/shared/ingrediant.model";

export const ADD_INGREDIANT = createAction('ADD_INGREDIANT',props<{ingediant : Ingrediant}>());
export const ADDTOSHOPPING_INGREDIANT = createAction('ADDTOSHOPPING_INGREDIANT',props<{ingediant : Ingrediant[]}>());
export const UPDATE_INGREDIANT = createAction('UPDATE_INGREDIANT',props<{index:number,ingediant : Ingrediant}>());
export const SELECT_INGREDIANT = createAction('SELECT_INGREDIANT',props<{index:number}>());
export const DELETE_INGREDIANT = createAction('DELETE_INGREDIANT',props<{index : number}>());






// export class AddIngrediant implements Action {

//     readonly type = ADD_INGREDIANT;
//     payload : Ingrediant;

// }