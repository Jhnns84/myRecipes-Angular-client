import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
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

  @Input() userData = { Username: '', Password: '' };

  /**
   * 
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   * @param router 
   */

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }


ngOnInit(): void {
}
/**
 * This function is responsible for submitting the login form inputs to the api
 */

loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {

     this.dialogRef.close(); // This will close the modal on success!
     localStorage.setItem('user', result.user.Username);
     localStorage.setItem('email', result.user.Email);
     localStorage.setItem('birthday', result.user.Birthday);
     localStorage.setItem('token', result.token);
     this.snackBar.open("Logged in!", 'OK', {
        duration: 2000
     });
     this.router.navigate(['recipes']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  }