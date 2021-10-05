import { Component, OnInit, Input } from '@angular/core';

import { ApiDataService } from '../fetch-api-data.service';

// Use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  // The @Input detractor defines this components Input
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: ApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  // Function to make the API call to edit user details
  editUserDetails(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      localStorage.setItem('user', result.dataReturned.Username);
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
