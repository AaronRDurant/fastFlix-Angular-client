import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring API URL that will provide data for the client app
const apiUrl = 'https://fastflixdb.herokuapp.com/api/';

/* *===== USER ROUTES =====* */
// User registration
@Injectable({
	providedIn: 'root',
})
export class UserRegistrationService {
	constructor(private http: HttpClient) {}

	// API call
	public userRegistration(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http
		.post(apiUrl + 'users', userDetails)
		.pipe(catchError(this.handleError));
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened; please try again later.');
	}
}

// User Login
@Injectable({
	providedIn: 'root',
})
export class UserLoginService {
	constructor(private http: HttpClient) {}

	// API call
	public userLogin(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http
		.post(apiUrl + 'login', userDetails)
		.pipe(catchError(this.handleError));
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened; please try again later.');
	}
}

// Get user's favorites
@Injectable({
	providedIn: 'root',
})
export class GetUserService {
	constructor(private http: HttpClient) {}

	// API call
	getUser(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.get(apiUrl + 'users/:Username', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened; please try again later.');
	}
}

// Add movie to user's favorites
@Injectable({
	providedIn: 'root',
})
export class AddFavoriteMovieService {
	constructor(private http: HttpClient) {}

	// API call
	addFavoriteMovie(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.post(apiUrl + 'users/:Username/:MovieID', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened: please try again later.');
	}
}

// Edit user
@Injectable({
	providedIn: 'root',
})
export class EditUserService {
	constructor(private http: HttpClient) {}

	// API call
	editUser(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.put(apiUrl + 'users/:Username', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened: please try again later.');
	}
}

// Delete user
@Injectable({
	providedIn: 'root',
})
export class DeleteUserService {
	constructor(private http: HttpClient) {}

	// API call
	deleteUser(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.delete(apiUrl + 'users/:Username', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened: please try again later.');
	}
}

// Delete movie from user's favorites
@Injectable({
	providedIn: 'root',
})
export class RemoveFavoriteMovieService {
	constructor(private http: HttpClient) {}

	// API call
	addFavoriteMovie(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.delete(apiUrl + 'users/:Username/:MovieID', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened: please try again later.');
	}
}

/* *===== MOVIE ROUTES =====* */
// Get all movies
@Injectable({
	providedIn: 'root',
})
export class GetMoviesService {
	constructor(private http: HttpClient) {}

	// API call
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

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened; please try again later.');
	}
}

// Get one movie
@Injectable({
	providedIn: 'root',
})
export class GetMovieByTitleService {
	constructor(private http: HttpClient) {}

	// API call
	getAllMovies(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
		.get(apiUrl + 'movies/:MovieID', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token,
			}),
		})
		.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error Handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened; please try again later.');
	}
}

// Get director
@Injectable({
	providedIn: 'root',
})
export class GetDirectorService {
	constructor(private http: HttpClient) {}

	// API call
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

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened: please try again later.');
	}
}

// Get genre
@Injectable({
	providedIn: 'root',
})
export class GetGenreService {
	constructor(private http: HttpClient) {}

	// API call
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

	// Non-typed response extraction
	private extractResponseData(res: Response | Object): Response | Object {
		const body = res;
		return body || {};
	}

	// Error handling
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error('Some error occurred:', error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` + `Error body is: ${error.error}`
			);
		}
		return throwError('Something bad happened: please try again later.');
	}
}
