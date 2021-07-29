import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://jm-myrecipes-api.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
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

// Login
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) {
  }

 // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
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

// Get Recipes
@Injectable({
  providedIn: 'root'
})
export class GetAllRecipesService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get all recipes
  public getAllRecipes(): Observable<any> {
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

// Get a single recipe
@Injectable({
  providedIn: 'root'
})
export class GetSingleRecipeService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a single recipe
  public getOneRecipe(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'recipes/:Name', {headers: new HttpHeaders(
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

// Get a cuisine
@Injectable({
  providedIn: 'root'
})
export class GetCuisineService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a cuisine
  public getCuisine(): Observable<any> {
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


// Get a mealtype
@Injectable({
  providedIn: 'root'
})
export class GetMealtypeService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a mealtype
  public getMealtype(): Observable<any> {
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


// Get a user
@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a user
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.get(apiUrl + 'users/:Username', {headers: new HttpHeaders(
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


// Get favorite recipes
@Injectable({
  providedIn: 'root'
})
export class GetFavoritesService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a users favorites
  public getFavorites(): Observable<any> {
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


// Add a  favorite recipe
@Injectable({
  providedIn: 'root'
})
export class AddFavroriteService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a users favorites
  public addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + 'users/:Username/:Recipes/:RecipeID', id, {headers: new HttpHeaders(
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


// Delete a  favorite recipe
@Injectable({
  providedIn: 'root'
})
export class DeleteFavroriteService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a users favorites
  public removeFavorite(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + 'users/:Username/:Recipes/:RecipeID', {headers: new HttpHeaders(
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


// edit a user
@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a user
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + 'users/:Username', userDetails, {headers: new HttpHeaders(
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



// delete a user
@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  constructor(private http: HttpClient) {
  }

 // Making the api call to get a user
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + 'users/:Username', {headers: new HttpHeaders(
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
