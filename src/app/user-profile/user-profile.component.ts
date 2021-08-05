import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  editUserData(): void {
    this.fetchApiData.editAccount(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', result.username);
        this.snackBar.open('Update successful!', 'OK', {
          duration: 5000,
        });
        setTimeout(
          () =>
            this.router.navigate(['user']).then(() => {
              window.location.reload();
            }),
          1500
        );
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 5000,
        });
      }
    );
  }
}
