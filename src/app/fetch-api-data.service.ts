import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
  *SERVICES: 
   * 1. Registration 
   * 2. Login
   * 3. Get all Recipes
   * 4. Get Cuisine
   * 5. Get Mealtype
   * 6. Get User
   * 7. Get Favorites
   * 8. Add Favorite
   * 9. Remove Favorite
   * 10. Edit User
   * 11. Delete User
*/

// API URL
const apiUrl = 'https://jm-myrecipes-api.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient, private router: Router) { }

/**
 * Call to Registration Endpoint
 * @param userDetails: Username, Password, Email, Birthday
 * @returns 
 */
  userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }



/**
 * Call to Login Endpoint
 * @param userDetails: Username, Password
 * @returns username and bearer token
 */
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }



/**
 * Call to recipes endpoint get all recipes
 * @returns array of all recipe objects
 */
  getAllRecipes(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'recipes', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * Call to recipes endpoint to get a cuisine
 * @returns cuisine object
 */
  getCuisine(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'recipes/Cuisines/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * Call to recipes endpoint to get a mealtype
 * @returns mealtype object
 */
  getMealtype(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'recipes/Mealtypes/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * Call to the user endpoint
 * @param user 
 * @returns user object
 */
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * Call to the users endpoint to get favorites
 * @returns 
 */
  getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.get(apiUrl + 'users/:Username/:Recipes/:RecipeID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * Call to users endpoint to add a recipe to the users favorites
 * @param id 
 * @returns 
 */
  addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}/recipes/${id}`, id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * Call to users endpoint to remove a recipe from the users favorites
 * @param id 
 * @returns 
 */
 removeFavorite(id: string): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http.put(apiUrl + `removefavorites/users/${user}/recipes/${id}`, {}, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * Call to users endpoint to edit a users details
 * @param userDetails 
 * @returns 
 */
 editUser(userDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http.put(apiUrl + `users/${user}`, userDetails, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * Call to users endpoint to delete a user
 * @returns 
 */
 deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


// Non-typed response extraction
private extractResponseData(res: Response | Object): any {
  const body = res;
  return body || { };
}

/**
 * Error handling
 * @param error 
 * @returns 
 */
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}