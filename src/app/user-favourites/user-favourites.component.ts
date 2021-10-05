import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

// User should be a global variable here, since it will need to be used in a few different functions (can be obtained from local storage)
// Need to use JSON.parse here as per - https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
// const user = JSON.parse(localStorage.getItem('user') || '{}');

@Component({
  selector: 'app-user-favourites',
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.scss']
})
export class UserFavouritesComponent implements OnInit {
  // The movies variable (declared here as an array) is where the movies returned from the API will be stored
  movies: any = [];
  // The favourites variable (an array) is where the users favourite movies will be stored
  favourites: any = [];
  user: any = localStorage.getItem('user')

  constructor(public fetchApiData: ApiDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavourites();
  }

  // The getMovies function will use the ApiDataService to make an API call with getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // The getUserFavourites function will use the ApiDataService to make an API call with getUser() (the favourites data will be extracted from the user object)
  getUserFavourites(): void {
    this.fetchApiData.getUser(this.user).subscribe((resp: any) => {
      this.favourites = resp.FavouriteMovies;
      return this.favourites;
    });
  }

  // Because getUserFavourites will only return the ID's of the favourite movies, the filterMovies() function will filter the full list of movies (from getMovies()) to cut down the movies array
  filterMovies(): void {
    this.movies.forEach((movie: any) => {
      if (this.favourites.includes(movie._id)) {
        this.favourites.push(movie);
      }
    });
    return this.favourites;
  }

  // Function that should allow for dynamic display of favourites (i.e. update in real time when movies are added/removed from the favourites list)
  movieIsFavourite(movieID: any): any {
    if (this.favourites.includes(movieID)) {
      return true;
    } else {
      return false;
    }
  }

  // openDirectorDialog opens the modal with director details
  openDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(DirectorComponent, {
      data: {Name, Bio, Birth, Death},
      width: '600px'
    });
  }

  // openGenreDialog opens the modal with genre details
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: {Name, Description},
      width: '600px'
    });
  }

  // openDetailsDialog opens the modal with more movie details (e.g. the description)
  openDetailsDialog(Title: string, Description: string, ImagePath: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {Title, Description, ImagePath},
      width: '600px'
    });
  }

  // addFavouriteMovie will add the selected movie to the users favourites, using the API call addUserFavourite()
  addFavouriteMovie(movieID: string): void {
    this.fetchApiData.addUserFavourite(movieID).subscribe((resp: any) => {
      return this.getUserFavourites();
    });
  }

  // removeFavouriteMovie will remove the selected movie from the users favourites, using the API call removeUserFavourite()
  removeFavouriteMovie(movieID: string): void {
    this.fetchApiData.removeUserFavourite(movieID).subscribe((resp: any) => {
      return this.getUserFavourites();
    })
  }
}
