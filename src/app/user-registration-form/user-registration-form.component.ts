import { Component, OnInit, Input } from '@angular/core';

// Service containing backend logic
import { FetchApiDataService } from '../fetch-api-data.service';

// Closes dialog after success
import { MatDialogRef } from '@angular/material/dialog';
// Displays notification to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-user-registration-form',
	templateUrl: './user-registration-form.component.html',
	styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
	@Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
		public snackBar: MatSnackBar
	) {}

	ngOnInit(): void {}

	// Sends form inputs to backend
	registerUser(): void {
		this.fetchApiData.createAccount(this.userData).subscribe(
      (response) => {
        // Logic for successful registration
        this.dialogRef.close(); // Closes dialog on success
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
