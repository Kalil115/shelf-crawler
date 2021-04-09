import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TvSeries } from '../common/tvSeries';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  private tvUrl = 'http://localhost:8080/tvs';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  getAllTv(page: number, pagesize: number): Observable<GetTvsResponse> {
    const url = this.tvUrl + "?page=" + page + '&size=' + pagesize;
    return this.httpClient.get<GetTvsResponse>(url);
  }

  updateTvSeries(tvSeries: TvSeries): Observable<TvSeries> {
    const url = this.tvUrl + '/' + tvSeries.id;
    return this.httpClient.put<TvSeries>(url, tvSeries ,this.httpOptions);
  }
}

interface GetTvsResponse {
  tvs: TvSeries[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number

}
