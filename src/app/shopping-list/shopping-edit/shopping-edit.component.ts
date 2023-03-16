import { Component, ViewChild, Output, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrediant } from 'app/shared/ingrediant.model';
import { ShoppingService } from '../shopping.service';
import { Store } from '@ngrx/store';
import { ADD_INGREDIANT, DELETE_INGREDIANT, UPDATE_INGREDIANT } from '../store/shopping-list.actions';
import { State } from '../store/shopping-list1.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm')
  basicForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingrediant;
  constructor(
    private shoppingService: ShoppingService,
    private store: Store<{shoppingList:State}>
  ) {}

  onAdditem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingrediant(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingService.updateIngrediant(
      //   this.editedItemIndex,
      //   newIngredient
      // );
      this.store.dispatch(UPDATE_INGREDIANT({
        index: this.editedItemIndex,
        ingediant: newIngredient

      }))
    } else {
      // this.shoppingService.addIngrediant(newIngredient);
      console.log(newIngredient);
      this.store.dispatch(
        ADD_INGREDIANT({
          ingediant: newIngredient,
        })
      );
    }
  }
  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(state => {
      console.log(state)
      
      if(state.editedIndex == -1){
        return
      }
      this.editMode =true;
      this.editedItem = state.ingrediants[state.editedIndex],
      this.editedItemIndex = state.editedIndex;
      this.basicForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.value,
      });
      
    })
    // this.subscription = this.shoppingService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     // this.editedItem = this.shoppingService.getIngerdiants(index);

    //   }
    // );
  }
  ngOnDestroy(): void {}

  onClear() {
    this.basicForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.shoppingService.deleteIngrediant(this.editedItemIndex);
    this.store.dispatch(DELETE_INGREDIANT({
      index :this.editedItemIndex
    }))
    this.onClear();
  }
}
