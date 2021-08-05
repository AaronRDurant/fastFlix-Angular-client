import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service containing backend logic
import { FetchApiDataService } from '../fetch-api-data.service';

// Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-movie-card',
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
	movies: any[] = [];

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getMovies();
	}

  // Get all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  // Add movie to favorites
  onAddFavoriteMovie(id: string): void {
    this.fetchApiData.addFavorite(id).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }
}
