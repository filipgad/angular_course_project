import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    

    recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel', 
            'What do you need?', 
            'https://cdn.doradcasmaku.pl/dynamic/f3/3e/c1/82/dbe69de0bedaa9915c020ea5/z-g_fit-800-600.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Frech Fries', 20)
            ]
        ),
        new Recipe(
            'Big burger', 
            'What do you need?', 
            'http://www.readersdigest.ca/wp-content/uploads/2015/11/gourmet-burger.jpg',
            [
                new Ingredient('Bread', 1),
                new Ingredient('Meat', 1)
            ]
        ),
        new Recipe(
            'Spaghetti', 
            'What do you need?', 
            'https://cdn.aniastarmach.pl/content/uploads/2016/02/makaron-spaghetti-bolognese-2-1200x630.jpg',
            [
                new Ingredient('Pasta', 1),
                new Ingredient('Tomates', 20)
            ]
        )
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}