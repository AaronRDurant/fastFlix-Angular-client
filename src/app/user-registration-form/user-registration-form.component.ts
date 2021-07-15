import { Component, OnInit, Input } from '@angular/core';

// API call for registering new user
import { UserRegistrationService } from '../fetch-api-data.service';
// Displays notification to user
import { MatSnackBar } from '@angular/material/snack-bar';
// Closes dialog after success
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-user-registration-form',
	templateUrl: './user-registration-form.component.html',
	styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
	@Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

	constructor(
		public fetchApiData: UserRegistrationService,
		public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
		public snackBar: MatSnackBar
	) {}

	ngOnInit(): void {}

	// Sends form inputs to backend
	registerUser(): void {
		this.fetchApiData.userRegistration(this.userData).subscribe(
			(response) => {
				// Logic for successful user registration will go here
				this.dialogRef.close(); // Will eventually close the modal on success
				console.log(response);
				this.snackBar.open(response, 'OK', {
					duration: 2000,
				});
			},
			(response) => {
				console.log(response);
				this.snackBar.open(response, 'OK', {
					duration: 2000,
				});
			}
		);
	}
}
