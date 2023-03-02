import { Ingrediant } from "../shared/ingrediant.model";

export class Recipe {

public name :string;
public desc : string;
public imagePath : string;
public ingrediant : Ingrediant[];

constructor(name:string , desc:string, imagePath:string, ingrediants:Ingrediant[]){

        this.name = name;
        this.desc = desc;
        this.imagePath = imagePath;
        this.ingrediant = ingrediants ;
        
}

}