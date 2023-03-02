import { Component, ViewChild, Output, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShoppingService } from '../shopping.service';
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
  constructor(private shoppingService: ShoppingService) {}

  onAdditem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingrediant(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngrediant(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingService.addIngrediant(newIngredient);
    }
  }
  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngerdiants(index);
        this.basicForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.value,
        });
      }
    );
  }
  ngOnDestroy(): void {}

  onClear() {
    this.basicForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngrediant(this.editedItemIndex);
    this.onClear();
  }
}
