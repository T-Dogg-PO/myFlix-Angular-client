import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  constructor(
    // Use @Inject with the MAT_DIALOG_DATA injection token to access genre data from the movie in question - https://material.angular.io/components/dialog/overview
    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string;
      Description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
