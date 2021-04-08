import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { updateLanguageServiceSourceFile } from 'typescript';
import { Book } from '../common/book';
import { BookshelfItem } from '../common/bookshelf-items';
import { BookshelfComponent } from '../components/shelves/bookshelf/bookshelf.component';
import { BookshelfItemService } from './bookshelf-item.service';
import { BookshelfService } from './bookshelf.service';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  bookshelfItemListSubject: Subject<BookshelfItem[]> = new BehaviorSubject<BookshelfItem[]>([]);
  bookshelfItemListSize: Subject<number> = new BehaviorSubject<number>(0);

  bookshelfItemList: BookshelfItem[] = [];

  constructor(private bookshelfItemService: BookshelfItemService,
    private bookshelfService: BookshelfService) { }

  fetchInitData(userId: number) {
    this.bookshelfService.getBookshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(bookshelf => bookshelf.name === "todo");
        if (found) {
          this.bookshelfItemList = found.bookshelfItems;
          this.refresh();
        }
      });
  }

  addToList(bookshelfId: number, newBook: Book) {

    let newBookshelfItem: BookshelfItem = new BookshelfItem();
    newBookshelfItem.book = newBook;
    newBookshelfItem.status = "LISTING";

    let duplicate: BookshelfItem = undefined;

    if (this.bookshelfItemList.length > 0) {
      duplicate = this.bookshelfItemList.find(item => item.book.id == newBookshelfItem.book.id);
    }

    if (duplicate == undefined) {
      this.bookshelfItemService.addBookshelfItem(bookshelfId, newBookshelfItem).subscribe(
        data => {
          newBookshelfItem = data;
          this.bookshelfItemList.push(newBookshelfItem);
          this.refresh();
        });
    }
  }

  remove(bookshelfItem: BookshelfItem) {
    const idx = this.bookshelfItemList.findIndex(item => item.id == bookshelfItem.id);
    if (idx > -1) {
      this.bookshelfItemList.splice(idx, 1);
      this.refresh();
    }
  }

  refresh() {
    this.bookshelfItemListSubject.next(this.bookshelfItemList);
    this.bookshelfItemListSize.next(this.bookshelfItemList.length);
  }

  update(bookshelfItemList: BookshelfItem[]){
    this.bookshelfItemList = bookshelfItemList;
    this.refresh();
  }

}
