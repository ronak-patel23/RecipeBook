import { Action, createAction, props } from "@ngrx/store";
import { Ingrediant } from "app/shared/ingrediant.model";

export const ADD_INGREDIANT = createAction('ADD_INGREDIANT',props<{ingediant : Ingrediant}>());





// export class AddIngrediant implements Action {

//     readonly type = ADD_INGREDIANT;
//     payload : Ingrediant;

// }