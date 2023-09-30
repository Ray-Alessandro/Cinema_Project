import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Movie } from '../models/movie.model~';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  base_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An errorr ocurred ${error.status}, body was ${error.error}`);
    } else{
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError('Something happened with request, please try again later');

  }

  // Product CRUD

  getMovie(id : string): Observable<Movie>{
    return this.http.get<Movie>(this.base_URL + '/peliculas'+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getMovies(): Observable<Movie>{
    return this.http.get<Movie>(this.base_URL + '/peliculas')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Create
  createMovie(data: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.base_URL + '/peliculas', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Update
  updateMovie(id: string, data: Movie): Observable<Movie>{
    return this.http.put<Movie>(this.base_URL + '/peliculas/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Delete
  deleteMovie(id: string){
    return this.http.delete<Movie>(this.base_URL + '/peliculas/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  
}
