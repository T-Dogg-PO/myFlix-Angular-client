import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ApiDataService } from '../fetch-api-data.service';

import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(public fetchApiData: ApiDataService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Retrieve the user details using the API call defined in fetch-api-data.service.ts
  getUserDetails(): void {
  // Need to use JSON.parse here as per - https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
  const userLocal = localStorage.getItem('user');
    this.fetchApiData.getUser(userLocal!).subscribe((resp: any) => {
      this.user = resp
    });
  }

  // Open the modal that allows you to edit user details (EditUserProfile component)
  editUserDetails(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '600px'
    });
  }

  // Function to delete a user by making the API call defined in fetch-api-data.service.ts
  deleteUser(): void {
    // Confirm function is a component method as per - https://stackoverflow.com/questions/41684114/easy-way-to-make-a-confirmation-dialog-in-angular
    if(confirm("Are you sure you want to delete this user? This action cannot be undone")) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe((resp: any) => {
        localStorage.clear();
        this.router.navigate(['welcome']);
      })
    }
  }
}
