import { HttpClient } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) { }

  getBookshelfByUserId(userId: number): Observable<Bookshelf[]> {
    const url = this.baseUrl + '/search/findByUserId?id=' + userId;
    return this.httpClient.get<Bookshelf[]>(url);
  }

  // getBookshelfById(bookshelfId: number): Observable<BookshelfItem[]> {
  //   const url = this.baseUrl + '/' + bookshelfId;
  //   return this.httpClient.get<GetBookshelfResponse>(url).pipe(
  //     map(response => response.bookshelfItems)
  //   );
  // }

  // getAllBookshelves(): Observable<Bookshelf[]> {
  //   return this.httpClient.get<Bookshelf[]>(this.baseUrl);
  // }
}

export interface GetBookshelfResponse {
  bookshelfItems: BookshelfItem[];
}  
