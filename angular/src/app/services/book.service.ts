import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl = 'http://localhost:8080/books';

  constructor(private httpClient: HttpClient) { }

  getAllBook(page: number, pagesize: number): Observable<GetBooksResponse> {
    const url = this.bookUrl + "/?page=" + page + '&size=' + pagesize;
    return this.httpClient.get<GetBooksResponse>(url);
  }
}

interface GetBooksResponse {
  books: Book[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number

}