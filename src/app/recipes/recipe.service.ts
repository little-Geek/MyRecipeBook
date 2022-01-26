
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Recipe} from './recipe.model'

import{ShoppingListService} from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs';


@Injectable()

export class RecipeService {
 

     recipeChanged = new Subject<Recipe[]> ();
    
    // recipeSelected = new EventEmitter<Recipe>();
    // recipeSelected = new Subject<Recipe>();
    // private recipes: Recipe[]= [
    //     new Recipe('A Test Recipe', 'This is simply a Test', 'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
    //     [new Ingredient('Meat',1) , new Ingredient('French Fries', 20)]),
    //     new Recipe('Another Test Recipe', 'This is simply a Test', 'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
    //     [new Ingredient('Bread',1) , new Ingredient('Lemon', 20)]),
    //   ]

    private recipes: Recipe[] = [];

      constructor(private slService : ShoppingListService){}
      
      getRecipe(){
          return this.recipes.slice();
      }

      getRecipes(index: number){
          return this.recipes.slice()[index];
      }

      setRecipes(recipes : Recipe[]){
          this.recipes = recipes;
          this.recipeChanged.next(this.recipes.slice());
      }


      addIngredientsToShoppingList(ingredients: Ingredient[]){
           this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
   this.recipes.push(recipe); 

   this.recipeChanged.next(this.recipes.slice());

      }


      updateRecipe( index: number ,  newRecipe: Recipe
        ){
          
               this.recipes[index] = newRecipe;     

      }

      deleteRecipe(index: number){
          this.recipes.splice( index, 1 );
          this.recipeChanged.next(this.recipes.slice());
      }
}