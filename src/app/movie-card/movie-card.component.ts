import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service containing backend logic
import { FetchApiDataService } from '../fetch-api-data.service';

// Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

@Component({
	selector: 'app-movie-card',
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
	movies: any[] = [];
	favoriteMovieIds: any[] = [];

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getMovies();
		this.getFavoriteMovies();
	}

	// Gets all movies from API
	getMovies(): void {
		this.fetchApiData.getAllMovies().subscribe((resp: any) => {
			this.movies = resp;
			return this.movies;
		});
	}

	// Determines whether to fill in movie-card star icon
	getFavoriteMovies(): void {
		const user = localStorage.getItem('user');
		this.fetchApiData.getUser(user).subscribe((resp: any) => {
			this.favoriteMovieIds = resp[0].FavoriteMovies;
		});
	}

	// Adds or removes movie from user's favorites
	onToggleFavoriteMovie(id: string): any {
		if (this.favoriteMovieIds.includes(id)) {
			this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
				this.snackBar.open('Removed from favorites!', 'OK', {
					duration: 2000,
				});
			});
			const index = this.favoriteMovieIds.indexOf(id);
			return this.favoriteMovieIds.splice(index, 1);
		} else {
			this.fetchApiData.addFavorite(id).subscribe((response: any) => {
				this.snackBar.open('Added to favorites!', 'OK', {
					duration: 2000,
				});
			});
		}
		return this.favoriteMovieIds.push(id);
	}

	// Opens synopsis modal
	openSynopsisDialog(synopsis: string): void {
		this.dialog.open(MovieSynopsisComponent, {
			data: { synopsis },
		});
	}

	// Opens director modal
	openDirectorDialog(name: string, bio: string, birth: string): void {
		this.dialog.open(MovieDirectorComponent, {
			data: { name, bio, birth },
		});
	}

	// Opens genre modal
	openGenreDialog(name: string, description: string): void {
		this.dialog.open(MovieGenreComponent, {
			data: { name, description },
		});
	}
}
