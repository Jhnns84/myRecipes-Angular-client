import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * 
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileUpdateComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * This submits a request to update the users information
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (resp) => {
        this.dialogRef.close();
        localStorage.setItem('user', resp.Username);
        localStorage.setItem('email', resp.Email);
        localStorage.setItem('birthday', resp.Birthday);
        this.snackBar.open("Profile updated", "OK", {
          duration: 2000,
        });
      },
      (res) => {
        console.log(res);
        this.snackBar.open(res, "OK", {
          duration: 2000,
        });
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
  }
}
