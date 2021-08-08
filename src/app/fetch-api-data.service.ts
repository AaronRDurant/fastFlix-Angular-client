import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// API that provides data
const apiUrl = 'https://fastflixdb.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
	private isAuthenticated = false;
	private token: string = '';

	constructor(private http: HttpClient, private router: Router) {}

	// Returns token in local storage
	getToken() {
		return this.token;
	}

	// Returns boolean of user authentication status
	getIsAuth() {
		return this.isAuthenticated;
	}

	// Sets authentication status boolean to true
	setAuth() {
		this.isAuthenticated = true;
	}

	// Returns current username
	getUsername() {
		const username = localStorage.getItem('user');
		return username;
	}

	// Log out
	logout(): void {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	}

	// Log in
	login(userDetails: any): Observable<any> {
		this.isAuthenticated = true;
		return this.http
		.post(apiUrl + 'login', userDetails)
		.pipe(catchError(this.handleError));
	}

	// Get user info
	getUser(user: any): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.get(apiUrl + `users/${user}`, {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Register
	createAccount(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http
		.post(apiUrl + 'users', userDetails)
		.pipe(catchError(this.handleError));
	}

	// Edit account
	editAccount(userDetails: any): Observable<any> {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		return this.http
		.put(apiUrl + `users/${user}`, userDetails, {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Remove account
	removeAccount(): Observable<any> {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		return this.http
		.delete(apiUrl + `users/${user}`, {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Get all movies
	getAllMovies(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.get(apiUrl + 'movies', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Get one movie
	getSingleMovie(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.get(apiUrl + 'movies/:MovieID', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Get a director
	getDirector(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.get(apiUrl + 'movies/directors/:Director', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Get a genre
	getGenre(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.get(apiUrl + 'movies/genres/Genre', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Add movie to favorites
	addFavorite(id: string): Observable<any> {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');
		return this.http
		.post(apiUrl + `users/${username}/${id}`, id, {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Remove movie from favorites
	removeFavorite(id: string): Observable<any> {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');
		return this.http
		.delete(apiUrl + `users/${username}/${id}`, {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

  // Non-typed response extraction
	extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Unexpected Error: Please try again');
	}
}
