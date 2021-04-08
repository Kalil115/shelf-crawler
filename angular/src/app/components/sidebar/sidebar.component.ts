import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { User } from 'src/app/common/user';
import { BookListService } from 'src/app/services/book-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  bookshlefItemListSize: number = 0;
  user: User;

  constructor(private tokenStorageService:TokenStorageService,
     private bookListService: BookListService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    if(this.user){
      this.bookListService.fetchInitData(this.user.id);
    }
    this.updateBookListSize();
  }

  updateBookListSize() {
    this.bookListService.bookshelfItemListSize.subscribe(data => this.bookshlefItemListSize = data);
  }
}
