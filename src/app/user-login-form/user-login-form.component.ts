import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Service containing backend logic
import { FetchApiDataService } from '../fetch-api-data.service';

// Closes dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Displays notifications
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Sends form inputs to backend
  userLogin(): void {
    this.fetchApiData.login(this.userData).subscribe(
      (response) => {
        this.fetchApiData.setAuth(); // sets isAuthenticated to true
        this.dialogRef.close(); // Closes modal on success
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.snackBar.open('User logged in successfully!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
