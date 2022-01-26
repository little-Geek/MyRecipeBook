import {Ingredient} from '../shared/ingredient.model'
import { Subject} from 'rxjs';
import{EventEmitter} from '@angular/core'

export class ShoppingListService{
    startedEditing = new Subject<number>();
    // static getIngredients(): Ingredient[] {
    //   throw new Error('Method not implemented.');
    // }
    

    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[]= [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10),
    
        
      ];
  

        getIngredients(): Ingredient[]{
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        // this.ingredientsChanged.emit(this.ingredients.slice()); 
        this.ingredientsChanged.next(this.ingredients.slice()); 
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());

    }

    deleteIngredient(index: number){
        this.ingredients.splice(index , 1);
        this.ingredientsChanged.next(this.ingredients.slice());

    }

}