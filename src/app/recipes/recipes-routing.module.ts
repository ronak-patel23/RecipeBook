import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeResolverResolver } from '../recipe-resolver.resolver';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { RecpieStartComponent } from './recpie-start/recpie-start.component';

const routes: Routes = [
  
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecpieStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverResolver],
      },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
