import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-user-favourites',
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.scss']
})
export class UserFavouritesComponent implements OnInit {
  /**
   * Here the variables that will be used in this component are initialized.
   * The movies variable (declared here as an array) is where the movies returned from the API will be stored
   * The favourites variable (an array) is where the users favourite movies will be stored
   * user is the username of the currently logged in user (obtained from local storage, where it is set upon login)
   * favouriteMovieDetails is the array that will store the actual movie details (not just the ID of the movies) after the filterMovies function is run
  */
  movies: any = [];
  favourites: any = [];
  user: any = localStorage.getItem('user');
  favouriteMovieDetails: any = [];

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserFavourites();
  }

  /**
   * The getMovies function will use the ApiDataService to make an API call with getAllMovies()
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterMovies();
    });
  }

  /**
   * The getUserFavourites function will use the ApiDataService to make an API call with getUser() (the favourites data will be extracted from the user object)
  */
  getUserFavourites(): void {
    this.fetchApiData.getUser(this.user).subscribe((resp: any) => {
      this.favourites = resp.FavouriteMovies;
      this.getMovies();
    });
  }

  /**
   * Because getUserFavourites will only return the ID's of the favourite movies, the filterMovies() function will filter the full list of movies (from getMovies()) to cut down the movies array
  */
  filterMovies(): void {
    this.movies.forEach((movie: any) => {
      if (this.favourites.includes(movie._id)) {
        this.favouriteMovieDetails.push(movie);
      }
    });
  }

  /**
   * Function that should allow for dynamic display of favourites (i.e. update in real time when movies are added/removed from the favourites list)
   * @param movieID will go through all the movies displayed on the page, and return true/false for each depending on if they are found in the users favourites
  */
  movieIsFavourite(movieID: any): any {
    if (this.favourites.includes(movieID)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * openDirectorDialog opens the modal with director details
   * Takes the Director details as parameters, which will fill in the Director modal
  */
  openDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(DirectorComponent, {
      data: {Name, Bio, Birth, Death},
      width: '600px'
    });
  }

  /**
   * openGenreDialog opens the modal with genre details
   * Takes the Genre details as parameters, which will fill in the Genre modal
  */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: {Name, Description},
      width: '600px'
    });
  }

  /**
   * openDetailsDialog opens the modal with more movie details (e.g. the description)
   * Takes the Movie details as parameters, which will fill in the Movie modal
  */
  openDetailsDialog(Title: string, Description: string, ImagePath: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {Title, Description, ImagePath},
      width: '600px'
    });
  }

  /**
   * addFavouriteMovie will add the selected movie to the users favourites, using the API call addUserFavourite()
   * @param movieID a string that will be passed to the addUserFavourite function detailing which movie is being added to the users favourites
  */
  addFavouriteMovie(movieID: string): void {
    this.fetchApiData.addUserFavourite(movieID).subscribe((resp: any) => {
      return this.getUserFavourites();
    });
  }

  /**
   * removeFavouriteMovie will remove the selected movie from the users favourites, using the API call removeUserFavourite()
   * @param movieID a string that will be passed to the removeUserFavourite function detailing which movie is being removied to the users favourites
  */
  removeFavouriteMovie(movieID: string): void {
    this.fetchApiData.removeUserFavourite(movieID).subscribe((resp: any) => {
      return this.getUserFavourites();
    })
  }
}
