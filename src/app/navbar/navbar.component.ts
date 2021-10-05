import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // // User should be a global variable here, since it will need to be used in a few different functions (can be obtained from local storage)
  // // Need to use JSON.parse here as per - https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
  // user = localStorage.getItem('user');

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
