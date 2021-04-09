import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../common/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private Url = 'http://localhost:8080/movies';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  getAllMovie(page: number, pagesize: number): Observable<GetResponse> {
    const url = this.Url + "?page=" + page + '&size=' + pagesize;
    return this.httpClient.get<GetResponse>(url);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    const url = this.Url + '/' + movie.id;
    return this.httpClient.put<Movie>(url, movie ,this.httpOptions);
  }
}

interface GetResponse {
  movies: Movie[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number

}