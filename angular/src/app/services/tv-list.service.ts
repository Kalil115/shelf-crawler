import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TvSeries } from '../common/tvSeries';
import { TvshelfItem } from '../common/tvshelf-item';
import { TodoListStorageService } from './todo-list-storage.service';
import { TvshelfService } from './tvshelf.service';
import { TvshelfItemService } from './tvshlef-item.service';

@Injectable({
  providedIn: 'root'
})
export class TvListService {

  tvshelfItemListSubject: Subject<TvshelfItem[]> = new BehaviorSubject<TvshelfItem[]>([]);
  tvshelfItemListSize: Subject<number> = new BehaviorSubject<number>(0);

  tvshelfItemList: TvshelfItem[] = [];
  listingTvsSubject: any;
                                         
  constructor(private tvshelfItemService: TvshelfItemService,
    private tvshelfService: TvshelfService,
    private todoListStorageService:TodoListStorageService) { }

  fetchInitData(userId: number) {
    this.tvshelfService.getTvshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(tvshelf => tvshelf.name === "todo");
        if (found) {
          this.tvshelfItemList = found.tvshelfItems;
          this.todoListStorageService.saveTvshelfId(found.id);
          this.refresh();
        }
      });
  }

  // add a new tv fromo browse component
  addToTvTodoList(newTv: TvSeries) {

    let newTvshelfItem: TvshelfItem = new TvshelfItem();
    newTvshelfItem.tvSeries = newTv;
    newTvshelfItem.status = "LISTING";

    let duplicate: TvshelfItem = undefined;

    if (this.tvshelfItemList.length > 0) {
      duplicate = this.tvshelfItemList.find(item => item.tvSeries.id == newTvshelfItem.tvSeries.id);
    }

    if (duplicate == undefined) {
    const todoTvshelfId = this.todoListStorageService.getTvshelfId();

      this.tvshelfItemService.addTvshelfItem(todoTvshelfId, newTvshelfItem).subscribe(
        data => {
          newTvshelfItem = data;
          this.tvshelfItemList.push(data);
          this.refresh();
        });
    }
  }

  remove(tvshelfItem: TvshelfItem) {
    const idx = this.tvshelfItemList.findIndex(item => item.id == tvshelfItem.id);
    if (idx > -1) {
      this.tvshelfItemList.splice(idx, 1);
      this.refresh();
    }
  }

  refresh() {
    this.tvshelfItemListSubject.next(this.tvshelfItemList);
    this.tvshelfItemListSize.next(this.tvshelfItemList.length);
  }

  update(tvshelfItemList: TvshelfItem[]){
    this.tvshelfItemList = tvshelfItemList;
    this.refresh();
  }
}
