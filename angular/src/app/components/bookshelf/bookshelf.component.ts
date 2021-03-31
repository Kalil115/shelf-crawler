import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { Bookshelf } from 'src/app/common/bookshelf';
import { BookshelfItem } from 'src/app/common/bookshelf-items';
import { BookshelfService } from 'src/app/services/bookshelf.service';


@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BookshelfComponent implements OnInit {

  bookshelves: Bookshelf[] = [];
  bookshelfItems: BookshelfItem[];
  results: any;
  columnsToDisplay = ['title', 'author', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  constructor(private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.getBookshelfByID(1);
  }


  getAllShelves() {
    const userId = 1;
    this.bookshelfService.getBookshelfByUserId(userId).subscribe(
      data => this.bookshelves = data
    );
  }

  getBookshelfByID(bookshelfId: number) {
    this.bookshelfService.getBookshelfById(bookshelfId).subscribe(
      // data => this.results = new MatTableDataSource(data)
      data => this.bookshelfItems = data
    )
  }


}

export interface PeriodicElement {
  id: number,
  book: Book,
  comment: string,
  rating: number,
  bookshelfItems: BookshelfItem[];
}