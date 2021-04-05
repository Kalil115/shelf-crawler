import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { Bookshelf } from 'src/app/common/bookshelf';
import { BookshelfItem } from 'src/app/common/bookshelf-items';
import { User } from 'src/app/common/user';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { YearPickerServiceService } from 'src/app/services/year-picker.service';


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

  user: User;
  currentYear: number;
  bookshelves: Bookshelf[] = [];
  bookshelfItems: BookshelfItem[];
  results: any;
  columnsToDisplay = ['title', 'author', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  constructor(private tokenStorageService:TokenStorageService,
              private yearPickerService: YearPickerServiceService,
              private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.currentYear = this.yearPickerService.getYear();
    this.getBookshelfByUserId(this.user.id);
    // this.getBookshelfByID(1);
    // this.getBookshelfItemByBookshelfName(this.currentYear.toString());
    // this.getAllBookshelves();
  }


  // getBookshelfByID(bookshelfId: number) {
  //   this.bookshelfService.getBookshelfById(bookshelfId).subscribe(
  //     // data => this.results = new MatTableDataSource(data)
  //     data => this.bookshelfItems = data
  //     // data => console.log(data)
  //   )
  // }



  // getAllBookshelves(){
  //   this.bookshelfService.getAllBookshelves().subscribe(
  //     // data => this.bookshelves = data
  //     data => console.log(data)
  //   );
  // }

  getBookshelfByUserId(userId: number): void {
    this.bookshelfService.getBookshelfByUserId(userId).subscribe(
      data => console.log(data)
    );
  }
  


}

export interface PeriodicElement {
  id: number,
  book: Book,
  comment: string,
  rating: number,
  bookshelfItems: BookshelfItem[];
}