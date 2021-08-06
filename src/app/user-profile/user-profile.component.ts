import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemoveAccountComponent } from '../remove-account/remove-account.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

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

  removeAccount(): void {
    this.dialog.open(RemoveAccountComponent);
  }

  // Opens modal with genre info
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }

  // Opens modal with director info
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth },
    });
  }
}
