import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { Bookshelf } from 'src/app/common/bookshelf';
import { BookshelfItem } from 'src/app/common/bookshelf-items';
import { User } from 'src/app/common/user';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { YearPickerService } from 'src/app/services/year-picker.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { BookshelfItemService } from 'src/app/services/bookshelf-item.service';

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
export class BookshelfComponent implements OnInit, AfterViewInit {

  createShelf: any = {
    newGoal: null
  }
  editGoalForm: any = {
    newGoal: null
  }

  editBookshelgItemForm: any = {
    id: null,
    rating: null,
    reason: null,
    status: null,
    comment: null,
  }
  editBookshelfItemHolder: BookshelfItem;

  user: User;
  currentYear: number;
  reachRate: number;
  goal: number;
  bookshelf: Bookshelf;
  bookshelfName: string;
  bookshelfItems: BookshelfItem[];
  dataSource: any = new MatTableDataSource();
  columnsToDisplay = ['title', 'author', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  @ViewChild(MatSort) sort: MatSort;


  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
    private yearPickerService: YearPickerService,
    private bookshelfService: BookshelfService,
    private bookshelfItemService: BookshelfItemService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.editBookshelfItemHolder = new BookshelfItem(new Book());
    if (this.user == null) {
      this.router.navigate(['login']);
    }

    this.yearPickerService.currentYear.subscribe(data => {
      this.currentYear = data;
      this.getBookshelfByUserIdAndBookshelfName(this.user.id, data);
      this.ngAfterViewInit();
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getBookshelfByUserIdAndBookshelfName(userId: number, bookshelfName: number): void {
    this.bookshelfService.getBookshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(bookshelf => bookshelf.name === bookshelfName.toString());
        if (found) {
          this.bookshelf = found;
          this.bookshelfName = found.name;
          // this.bookshelfItems = found.bookshelfItems;
          this.dataSource = new MatTableDataSource(found.bookshelfItems);
          this.dataSource.sort = this.sort;
          this.reachRate = found.reachRate * 100;
          this.goal = found.goal;
        } else {
          this.bookshelf = new Bookshelf();
          this.bookshelfName = null;
          this.dataSource = new MatTableDataSource();
          this.reachRate = 0;
          this.goal = 0;
        }
      }
    );
  }

  editGoal() {
    const newGoal = this.editGoalForm.newGoal;
    if (this.bookshelf.id && newGoal) {
      const newBookshelf = new Bookshelf();
      newBookshelf.id = this.bookshelf.id;
      newBookshelf.name = this.bookshelfName;
      newBookshelf.goal = newGoal;
      newBookshelf.reachRate = this.computeReachRate(this.bookshelf, newGoal);
      this.bookshelfService.updateBookshelfGoal(newBookshelf).subscribe();
    }
  }

  computeReachRate(bookshelf: Bookshelf, newGoal: number): number {
    const bookshelfItems = bookshelf.bookshelfItems;
    const count: number = bookshelfItems.filter(item => item.rating != null).length;
    const reachRate: number = +(count / newGoal).toFixed(2);
    this.reachRate = reachRate * 100;
    this.goal = newGoal;
    return reachRate;
  }

  buildShelf() {
    const newGoal = this.createShelf.newGoal;
    if (newGoal) {
      const newBookshelf = new Bookshelf();
      newBookshelf.name = this.currentYear.toString();
      newBookshelf.goal = newGoal;
      newBookshelf.reachRate = 0;
      this.bookshelfName = newBookshelf.name;
      this.bookshelfService.addBookshelf(this.user.id, newBookshelf).subscribe();
    }
  }

  openEditBookshelfModal(bookshelfItemId: number){
    this.bookshelfItemService.findBookshelfItemById(bookshelfItemId).subscribe(
      data =>{
        this.editBookshelfItemHolder = data;
      });
    this.editBookshelgItemForm.id = bookshelfItemId;
  }

  updateBookshelfItem() {
    const newBookshelgItem = this.editBookshelgItemForm;
    console.log(newBookshelgItem.id);
    console.log(newBookshelgItem.rating);
    console.log(newBookshelgItem.reason);
    console.log(newBookshelgItem.status);
    console.log(newBookshelgItem.comment);
  }

}

export interface PeriodicElement {
  id: number,
  book: Book,
  comment: string,
  rating: number,
  bookshelfItems: BookshelfItem[];
}