import { Component, OnInit } from '@angular/core';
import { GetAllRecipesService } from '../fetch-api-data.service'

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
  constructor(
    public fetchApiData: GetAllRecipesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getRecipes();
}

getRecipes(): void {
  this.fetchApiData.getAllRecipes().subscribe((resp: any) => {
      this.recipes = resp;
      console.log(this.recipes);
      return this.recipes;
    });
  }


showCuisine(
  name: string,
  description: string
): void {
  this.dialog.open(CuisineComponent, {
    data: { name, description },
    panelClass: 'cuisine-dialog',
  });
}

showMealType(
  name: string,
  description: string
): void {
  this.dialog.open(MealtypeComponent, {
    data: { name, description },
    panelClass: 'mealtype-dialog',
  });
}

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

}

