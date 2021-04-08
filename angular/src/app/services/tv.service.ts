import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tv } from '../common/tv';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  private tvUrl = 'http://localhost:8080/tvs';

  constructor(private httpClient: HttpClient) { }

  getAllTv(page: number, pagesize: number): Observable<GetTvsResponse> {
    const url = this.tvUrl + "?page=" + page + '&size=' + pagesize;
    return this.httpClient.get<GetTvsResponse>(url);
  }
}

interface GetTvsResponse {
  tvs: Tv[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number

}
