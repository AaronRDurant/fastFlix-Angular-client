import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'fastFlix-Angular-client';

	constructor(
		private _renderer: Renderer2,
		public fetchApiData: FetchApiDataService,
		private router: Router
	) {}

	// Handles conditional rendering
	isAuth() {
		if (localStorage.getItem('token') !== null) {
			return true;
		} else {
			return false;
		}
	}

	// Logs user out and redirects to welcome screen
	onLogout(): void {
		this.fetchApiData.logout();
		this.router.navigate(['/welcome']);
	}

	// Navigates to profile
	openProfile(): void {
		this.router.navigate(['/profile']);
	}

	// Logo links to either movies or welcome page
	backToMain(): void {
		if (localStorage.getItem('token') !== null) {
			this.router.navigate(['/movies']);
		} else {
			this.router.navigate(['/welcome']);
		}
	}

	toMovies(): void {
		this.router.navigate(['/movies']);
	}
}
