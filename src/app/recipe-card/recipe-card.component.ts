import { Component, OnInit } from '@angular/core';
import { GetAllRecipesService } from '../fetch-api-data.service'

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  recipes: any[] = [];
  constructor(public fetchApiData: GetAllRecipesService) { }

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
}