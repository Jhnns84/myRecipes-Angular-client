import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DetailsComponent } from '../details/details.component';
import { CuisineComponent } from '../cuisine/cuisine.component';
import { MealtypeComponent } from '../mealtype/mealtype.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  recipes: any[] = [];

  /**
   * 
   * @param fetchApiData 
   * @param dialog 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getRecipes();
}

/**
 * This gets all recipes from the database
 * @returns all recipe objects
 */
getRecipes(): void {
  this.fetchApiData.getAllRecipes().subscribe((resp: any) => {
      this.recipes = resp;
      console.log(this.recipes);
      return this.recipes;
    });
  }

/**
 * This shows a dialog with information about the cuisine of the chosen recipe
 * @param name 
 * @param description 
 */
showCuisine(
  name: string,
  description: string
): void {
  this.dialog.open(CuisineComponent, {
    data: { name, description },
    panelClass: 'cuisine-dialog',
  });
}

/**
 * This shows a dialog with information about the mealtype of the chosen recipe
 * @param name 
 * @param description 
 */
showMealType(
  name: string,
  description: string
): void {
  this.dialog.open(MealtypeComponent, {
    data: { name, description },
    panelClass: 'mealtype-dialog',
  });
}

/**
 * This shows a dialog with details about the chosen recipe
 * @param name 
 * @param imagePath 
 * @param description 
 * @param difficulty 
 * @param time 
 */
showDetails(
  name: string,
  imagePath: string,
  description: string,
  difficulty: string,
  time: string

): void {
  this.dialog.open(DetailsComponent, {
    data: { name, imagePath, description, difficulty, time },
    panelClass: 'details-dialog',
  });
}

/**
 * This adds the chosen recipe to the users favorites
 * @param id 
 * @param name 
 */
addFavorite(id: string, name: string): void {
  this.fetchApiData.addFavorite(id).subscribe((resp: any) => {
    console.log(resp);
    let favrecipes = resp.FavoriteRecipes;
    localStorage.setItem('FavoriteRecipes', favrecipes);
    this.snackBar.open(`${name} has been added to your favorite recipes`, 'OK', {
      duration: 2000,
    });
  });

}

}

