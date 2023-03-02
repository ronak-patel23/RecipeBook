import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediant: Ingrediant[];
  private igChangeSub: Subscription;
  constructor(private shoppingService: ShoppingService) {}

  addItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }

  

  ngOnInit() {
    this.ingrediant = this.shoppingService.getIngrediant();
    this.igChangeSub = this.shoppingService.ingrediantChange.subscribe(
      (ingrediant: Ingrediant[]) => {
        this.ingrediant = ingrediant;
        // console.log(this.ingrediant);
      }
    );
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
