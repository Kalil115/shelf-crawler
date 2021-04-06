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

  createShelf: any = {
    newGoal: null
  }
  editGoalForm: any = {
    newGoal: null
  }

  user: User;
  currentYear: number;
  reachRate: number;
  goal: number;
  bookshelf: Bookshelf;
  bookshelfName: string;
  bookshelfItems: BookshelfItem[];
  columnsToDisplay = ['title', 'author', 'rating', 'status'];
  expandedElement: PeriodicElement | null;

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
    private yearPickerService: YearPickerService,
    private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    if (this.user == null) {
      this.router.navigate(['login']);
    }

    this.yearPickerService.currentYear.subscribe(data => {
      this.currentYear = data;
      this.getBookshelfByUserIdAndBookshelfName(this.user.id, data);
    });

  }

  getBookshelfByUserIdAndBookshelfName(userId: number, bookshelfName: number): void {
    this.bookshelfService.getBookshelfByUserId(userId).subscribe(
      data => {
        const found = data.find(bookshelf => bookshelf.name === bookshelfName.toString());
        if (found) {
          this.bookshelf = found;
          this.bookshelfName = found.name;
          this.bookshelfItems = found.bookshelfItems;
          this.reachRate = found.reachRate * 100;
          this.goal = found.goal;
        } else {
          this.bookshelf = new Bookshelf();
          this.bookshelfName = null;
          this.bookshelfItems = null;
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
    if(newGoal) {
      const newBookshelf = new Bookshelf();
      newBookshelf.name = this.currentYear.toString();
      newBookshelf.goal = newGoal;
      newBookshelf.reachRate = 0;
      this.bookshelfName = newBookshelf.name;
      this.bookshelfService.addBookshelf(this.user.id, newBookshelf).subscribe();
    }
  }

}

export interface PeriodicElement {
  id: number,
  book: Book,
  comment: string,
  rating: number,
  bookshelfItems: BookshelfItem[];
}