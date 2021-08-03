import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://jm-myrecipes-api.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient, private router: Router) { }


 // REGISTRATION
  userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }



 // LOGIN
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }



 // GET ALL RECIPES
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

  // GET A CUISINE
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

  // GET A MEALTYPE
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

  // GET A USER
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

  // GET A USERS FAVORITES
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

  // ADD A FAVORITE
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

 // REMOVE A FAVORITE
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

 // EDIT A USER
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

 // DELETE A USER
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