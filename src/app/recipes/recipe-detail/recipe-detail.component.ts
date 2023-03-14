import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input()
  recipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  addtoShoppingList() {
    this.recipeService.addtoshoppingList(this.recipe.ingrediant);
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipes(this.id);
    });
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
