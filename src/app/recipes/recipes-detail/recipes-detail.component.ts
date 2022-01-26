import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  id: number;
@Input() recipe: Recipe;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) =>{
             this.id = params['id'];
             this.recipe = this.recipeService.getRecipes(this.id);
    });
      
    

    }
  
    onEditRecipe(){
       this.router.navigate(['edit'], {relativeTo:this.route});
       this.router.navigate(['../', this.id,'edit'],{relativeTo: this.route});
    }
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe(){
       this.recipeService.deleteRecipe(this.id); 
       this.router.navigate(['/recipes']);

  }

  

}
