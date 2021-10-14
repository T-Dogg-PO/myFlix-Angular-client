import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

// Use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  // The @Input detractor defines this components Input
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) 
    // https://stackoverflow.com/questions/59552387/how-to-reload-a-page-in-angular-8-the-proper-way - Trying to get refreshing user details after update working
    { this.router.routeReuseStrategy.shouldReuseRoute = () => {
          return false;
        };
      }

  ngOnInit(): void {
  }

  /**
   * Function that will edit user details by making the API call through the ApiDataService component (defined in fetch-api-data.service.ts).
   * The userData that is passed to this API call is obtained from the user inputs defined in the Input detractor above
  */
  editUserDetails(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      localStorage.setItem('user', result.Username);
      this.router.navigateByUrl('/user');
      this.snackBar.open('User details updated!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
