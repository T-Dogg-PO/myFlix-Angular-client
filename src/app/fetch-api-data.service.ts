import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://t-dogg-movies-api.herokuapp.com/';

// Detractor is a function that augments a piece of code
// In this case, telling Angular that this service will be available everywhere (hence the 'root')
@Injectable({
  providedIn: 'root'
})

export class ApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint as defined in the backend
  // Note that Observable<any> acts a little bit like a promise for asynchronous functionality
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  
  // Call for getting all the movies in the database
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Call for getting one movie in the database
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Call for getting one director
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/directors/${director}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Call for getting one genre
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genres/${genre}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Call for getting the details of one user (the currently logged in user)
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Call for getting the favourite movies of one user (the currently logged in user)
  // NOTE that it seems I don't have a GET favourite movies endpoint in my API, I will need to set that up before the next exercise (or write a custom function to extract it from the user data, like I did in the React version of this project)
  getUserFavourites(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    // const user = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}/Movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Call for adding a favourite movie for one user (the currently logged in user)
  addUserFavourite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/Movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Call for removing a favourite movie for one user (the currently logged in user)
  removeUserFavourite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/Movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Call for editing user details
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Call for deleting a user
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Function for extracting response data from the API calls
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }

  // Function for handling errors from the API calls
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}