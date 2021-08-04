import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  recipes: any[] = [];
  favorites: any = [];

  /**
   * 
   * @param fetchApiData 
   * @param router 
   * @param snackBar 
   * @param dialog 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

/**
 * This gets the current users information
 */
  getUser(): void {
    let FavoriteRecipes = localStorage.getItem('FavoriteRecipes');
    let Username = localStorage.getItem('user');
    let Email = localStorage.getItem('email');
    let Birthday = localStorage.getItem('birthday');
    this.user = {
      "FavoriteRecipes": FavoriteRecipes,
      "Username": Username,
      "Email": Email,
      "Birthday": Birthday,
    }
    this.getRecipes();
  }

  /**
   * This gets all recipes
   */
  getRecipes(): void {
    this.fetchApiData.getAllRecipes().subscribe((resp: any) => {
      this.recipes = resp;
      this.filterFavorites();
    });
  }

/**
 * This filters the recipes to find the users favorites
 * @returns array of favorite recipe objects
 */
  filterFavorites(): void {
    this.recipes.forEach((recipe: any) => {
      if (this.user.FavoriteRecipes.includes(recipe._id)) {
        this.favorites.push(recipe);
      }
    });
    return this.favorites;
  }

  /**
   * This sends a put request to remove a favorite
   * @param id 
   * @param name 
   */
  removeFavorites(id: string, name: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
      console.log(resp);
      let favrecipes = resp.FavoriteRecipes;
      localStorage.setItem('FavoriteRecipes', favrecipes);
      this.snackBar.open(
        `${name} has been removed from your favorite Recipes`,
        'OK',
        {
          duration: 2000,
        }
      );
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  /**
   * This asks the user to confirm and then sends a delete request to delete the user
   */
  deleteUser(): void {
    let check = confirm(
      'Are you sure you want to delete your profile?'
    );
    if (check) {
      this.fetchApiData.deleteUser().subscribe((resp: any) => {
        this.snackBar.open('Profile deleted', 'OK', {
          duration: 2000,
        }
        );
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
      );
    }
  }

  /**
   * This opens the dialog to edit the user info
   */
  profileUpdateDialog(): void {
    this.dialog.open(ProfileUpdateComponent, {
      panelClass: 'update-dialog',
    });
  }




}
