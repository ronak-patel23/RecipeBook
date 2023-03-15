import { Action } from "@ngrx/store";
import { Ingrediant } from "app/shared/ingrediant.model";

export const ADD_INGREDIANT = 'ADD_INGREDIANT';

export class AddIngrediant implements Action {

    readonly type = ADD_INGREDIANT;
    payload : Ingrediant;

}