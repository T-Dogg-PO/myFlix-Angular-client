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

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * Making the api call for the user registration endpoint as defined in the backend
   * @param userDetails An object containing the Username, Password, Email address (all strings) and optionally Birthday (date)
   * @returns The POST endpoint for registering a new user
   */
  // Note that Observable<any> acts a little bit like a promise for asynchronous functionality
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Call for the user login endpoint
   * @param userDetails An object containing the Username, Password, Email address (all strings) and optionally Birthday (date)
   * @returns The POST endpoint for logging a user in
   */
  // Call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Call for getting all the movies in the database
   * @returns The GET endpoint for getting the list of all movies, which will return an array of Movie objects
   */
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

  /**
   * Call for getting one movie in the database
   * @param title A string of the movie title in question
   * @returns The GET endpoint for getting a single movies details, which will return a Movie object
   */
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

  /**
   * Call for getting one director
   * @param director A string of the director's name
   * @returns The GET endpoint for getting a single directors details, which will return a Director object
   */
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

  /**
   * Call for getting one genre
   * @param genre A string of the genres name
   * @returns The GET endpoint for getting a single genres details, which will return a Genre object
   */
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

  /**
   * Call for getting the details of one user (the currently logged in user)
   * @param username A string of the user's username
   * @returns The GET endpoint for getting a single users details, which will return a User object
   */
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

  /**
   * Call for getting the favourite movies of one user (the currently logged in user)
   * @param username A string of the user's username
   * @returns The GET endpoint for getting a single users favourite movies, which will return an array of MovieID's
   */
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

  /**
   * Call for adding a favourite movie for one user (the currently logged in user)
   * @param movieID A string of the movie's ID
   * @returns The POST endpoint which will add this MovieID to the users FavouriteMovies array
   */
  addUserFavourite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/Movies/${movieID}`, movieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Call for removing a favourite movie for one user (the currently logged in user)
   * @param movieID A string of the movie's ID
   * @returns The DELETE endpoint which will remove this MovieID from the users FavouriteMovies array
   */
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

  /**
   * Call for editing user details
   * @param userData An object containing the Username, Password, Email and optionally Birthday of the user being edited
   * @returns The PUT endpoint which will update this users details
   */
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userData, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Call for deleting a user
   * @param username A string of the users username
   * @returns The DELETE endpoint which will delete the user entry in question from the database
   */
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