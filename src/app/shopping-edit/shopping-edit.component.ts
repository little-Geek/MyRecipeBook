import { Component, ElementRef, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import{ShoppingListService} from '../shopping-list/shopping-list.service'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slform: NgForm ;
  editMode = false;
  subscription: Subscription;
  editedItemIndex: number ;
  editedItem : Ingredient;

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;

//  ingredientAdded = new EventEmitter<{name: string, amount: number}>();
//  @Output() ingredientAdded = new EventEmitter<Ingredient>();  
constructor(private slService: ShoppingListService) { }

ngOnInit() {
  this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
}

//   onSubmit(){
// //passing the data to shopping list componenteditMode that manages the array of ingredients
// const ingName  = this.nameInputRef.nativeElement.value;
// const ingAmount = this.amountInputRef.nativeElement.value;

// const newIngredient = new Ingredient(ingName, ingAmount);
// this.slService.addIngredient(newIngredient);
// // this.ingredientAdded.emit(newIngredient);


//   }
//   onSubmit(form: NgForm){
// //passing the data to shopping list component that manages the array of ingredients
// // const ingName  = this.nameInputRef.nativeElement.value;
// // const ingAmount = this.amountInputRef.nativeElement.value;

// const value = form.value;

// const newIngredient = new Ingredient(value.name, value.amount);

// if(this.editMode){
//   this.slService.updateIngredient(this.editedItemIndex, newIngredient);

//   }
//   else{
//     this.slService.addIngredient(newIngredient);
//   }

//   this.editMode = false;
//   form.reset();



// // this.ingredientAdded.emit(newIngredient);


//   }

onSubmit(form: NgForm) {
  const value = form.value;
  const newIngredient = new Ingredient(value.name, value.amount);
  if (this.editMode) {
    this.slService.updateIngredient(this.editedItemIndex, newIngredient);
  } else {
    this.slService.addIngredient(newIngredient);
  }
  this.editMode = false;
  form.reset();
}


onClear(){
  this.slform.reset();
  this.editMode = false;
}

onDelete(){
  this.slService.deleteIngredient(this.editedItemIndex);
  this.onClear();
}


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


}
