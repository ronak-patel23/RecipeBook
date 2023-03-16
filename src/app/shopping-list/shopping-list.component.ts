import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingService } from './shopping.service';
import { SELECT_INGREDIANT } from './store/shopping-list.actions';
import { State } from './store/shopping-list1.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediant: Observable<{ingrediants:Ingrediant[]}>
  // private igChangeSub: Subscription;
  constructor(private shoppingService: ShoppingService, private store:Store<{shoppingList: State}>) {}

  addItem(index: number) {
    // this.shoppingService.startedEditing.next(index);
        this.store.dispatch(SELECT_INGREDIANT({
              index: index
        }))
  }

  

  ngOnInit() {
    this.ingrediant = this.store.select('shoppingList');

    // this.ingrediant = this.shoppingService.getIngrediant();
    // this.igChangeSub = this.shoppingService.ingrediantChange.subscribe(
    //   (ingrediant: Ingrediant[]) => {
    //     this.ingrediant = ingrediant;
        // console.log(this.ingrediant);
    //   }
    // );
  }
  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
  }
}
