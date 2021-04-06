import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookshelf } from '../common/bookshelf';
import { BookshelfItem } from '../common/bookshelf-items';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {

  private baseUrl = 'http://localhost:8080/bookshelves';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  getBookshelfByUserId(userId: number): Observable<Bookshelf[]> {
    const url = this.baseUrl + '/search/findByUserId?id=' + userId;
    return this.httpClient.get<Bookshelf[]>(url);
  }

  getBookshelfById(bookshelfId: number): Observable<Bookshelf> {
    const url = this.baseUrl + '/' + bookshelfId;
    return this.httpClient.get<Bookshelf>(url);
  }

  updateBookshelfGoal(bookshelf: Bookshelf): Observable<void> {
    const url = this.baseUrl + "/updateBookshelfGoal/" + bookshelf.id;
    return this.httpClient.put<void>(url, bookshelf, this.httpOptions);
  }



  // getAllBookshelves(): Observable<Bookshelf[]> {
  //   return this.httpClient.get<Bookshelf[]>(this.baseUrl);
  // }
}
