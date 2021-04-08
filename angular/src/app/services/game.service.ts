import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../common/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'http://localhost:8080/games';

  constructor(private httpClient: HttpClient) { }

  getAllGame(page: number, pagesize: number): Observable<GetGamesResponse> {
    const url = this.gameUrl + "?page=" + page + '&size=' + pagesize;
    return this.httpClient.get<GetGamesResponse>(url);
  }
}

interface GetGamesResponse {
  games: Game[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number

}