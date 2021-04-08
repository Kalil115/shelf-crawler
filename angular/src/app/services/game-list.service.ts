import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game } from '../common/game';
import { GameshelfItem } from '../common/gameshelf-item';
import { GameshelfItemService } from './gameshelf-item.service';
import { GameshelfService } from './gameshelf.service';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameListService {


  gameshelfItemListSubject: Subject<GameshelfItem[]> = new BehaviorSubject<GameshelfItem[]>([]);
  gameshelfItemListSize: Subject<number> = new BehaviorSubject<number>(0);

  gameshelfItemList: GameshelfItem[] = [];

  constructor(private gameshelfItemService: GameshelfItemService,
    private gameshelfService: GameshelfService,
    private todoListStorageService:TodoListStorageService) { }

  fetchInitData(userId: number) {
    this.gameshelfService.getGameshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(gameshelf => gameshelf.name === "todo");
        if (found) {
          this.gameshelfItemList = found.gameshelfItems;
          this.todoListStorageService.saveGameshelfId(found.id);
          this.refresh();
        }
      });
  }

  // add a new game fromo browse component
  addToGameTodoList(newGame: Game) {

    let newGameshelfItem: GameshelfItem = new GameshelfItem();
    newGameshelfItem.game = newGame;
    newGameshelfItem.status = "LISTING";

    let duplicate: GameshelfItem = undefined;

    if (this.gameshelfItemList.length > 0) {
      duplicate = this.gameshelfItemList.find(item => item.game.id == newGameshelfItem.game.id);
    }

    if (duplicate == undefined) {
    const todoGameshelfId = this.todoListStorageService.getGameshelfId();

      this.gameshelfItemService.addGameshelfItem(todoGameshelfId, newGameshelfItem).subscribe(
        data => {
          newGameshelfItem = data;
          this.gameshelfItemList.push(data);
          this.refresh();
        });
    }
  }

  remove(gameshelfItem: GameshelfItem) {
    const idx = this.gameshelfItemList.findIndex(item => item.id == gameshelfItem.id);
    if (idx > -1) {
      this.gameshelfItemList.splice(idx, 1);
      this.refresh();
    }
  }

  refresh() {
    this.gameshelfItemListSubject.next(this.gameshelfItemList);
    this.gameshelfItemListSize.next(this.gameshelfItemList.length);
  }

  update(gameshelfItemList: GameshelfItem[]){
    this.gameshelfItemList = gameshelfItemList;
    this.refresh();
  }

}
