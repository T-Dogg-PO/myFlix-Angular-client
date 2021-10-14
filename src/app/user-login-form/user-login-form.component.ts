import { Component, OnInit, Input } from '@angular/core';

// Use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Use this import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  // The @Input detractor defines this components Input
  @Input() userData = { Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function that will log a user in by making the API call through the ApiDataService component (defined in fetch-api-data.service.ts).
   * The userData that is passed to this API call is obtained from the user inputs defined in the Input detractor above
  */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login will be found here soon
      // Close modal on successful registration
      this.dialogRef.close();
      console.log(result);
      // Add the username and response token to local storage
      localStorage.setItem('user', result.dataReturned.Username);
      localStorage.setItem('token', result.token);
      this.snackBar.open('User logged in successfully!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
