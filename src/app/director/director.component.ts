import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  constructor(
    /**
     * Use @Inject with the MAT_DIALOG_DATA injection token to access director data from the movie in question - https://material.angular.io/components/dialog/overview
    */
    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string;
    }) { }

  ngOnInit(): void {
  }

}
