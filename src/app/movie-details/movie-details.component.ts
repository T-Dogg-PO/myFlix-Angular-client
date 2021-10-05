import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    // Use @Inject with the MAT_DIALOG_DATA injection token to access movie data from the movie in question - https://material.angular.io/components/dialog/overview
    @Inject(MAT_DIALOG_DATA) public data: {
      Title: string;
      Description: string;
      ImagePath: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
