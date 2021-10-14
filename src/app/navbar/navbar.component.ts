import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Logout is a function that will clear the local storage (of both the username and the access token), then reroute the user to the welcome page
  */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
