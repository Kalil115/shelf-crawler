import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl = 'http://localhost:8080/books';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  getAllBook(page: number, pagesize: number): Observable<GetBooksResponse> {
    const url = this.bookUrl + "?page=" + page + '&size=' + pagesize;
    return this.httpClient.get<GetBooksResponse>(url);
  }

  updateBook(book: Book): Observable<Book> {
    const url = this.bookUrl + '/' + book.id;
    return this.httpClient.put<Book>(url, book ,this.httpOptions);
  }
}

interface GetBooksResponse {
  books: Book[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number

}