import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Movie } from '../models/movie.model~';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  base_URL = 'http://localhost:3000/peliculas';

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

  getList(): Observable<Movie>{
    return this.http.get<Movie>(this.base_URL)
    .pipe(retry(2), catchError(this.handleError));
  }

  getItem(id: string): Observable<Movie>{
    return this.http.get<Movie>(`${this.base_URL}/${id}`)
    .pipe(retry(2), catchError(this.handleError));
  }
  
}
