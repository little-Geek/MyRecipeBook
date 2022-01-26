import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';

import {RecipeService} from '../recipe.service'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
// @Output() RecipeWasSelected = new EventEmitter<Recipe>()

  // recipes: Recipe[]= [
  //   new Recipe('A Test Recipe', 'This is simply a Test', 'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg'),
  //   new Recipe('Another Test Recipe', 'This is simply a Test', 'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg')
  // ]

  recipes: Recipe[];
  subscription : Subscription ;
  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe((
  recipes: Recipe[]) =>{
          this.recipes = recipes;
  }
)

this.recipes = this.recipeService.getRecipe();


  }

  onNewRecipe(){
       this.router.navigate(['new'],{relativeTo:this.route});
  }

  // onRecipeSelected(recipe: Recipe){
  //   console.log(recipe);
  //   this.RecipeWasSelected.emit(recipe);
  // }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
