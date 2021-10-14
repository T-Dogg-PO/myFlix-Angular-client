import { Component, OnInit, Input } from '@angular/core';

// Use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Use this import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// @Component detractor tells Angular that the class right below it is a component
@Component({
  // The selector property defines the custom HTML element into which this component will render
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  // The @Input detractor defines this components Input
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  // The ngOnInit method is called once the component has received all its inputs
  ngOnInit(): void {
  }

  /**
   *  Function that will register a new user in by making the API call through the ApiDataService component (defined in fetch-api-data.service.ts)
   *  The userData that is passed to this API call is obtained from the user inputs defined in the Input detractor above
  */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration will be found here soon
      // Close modal on successful registration
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('User registered successfully!', 'OK', {
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
