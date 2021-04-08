import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { Movie } from 'src/app/common/movie';
import { BookListService } from 'src/app/services/book-list.service';
import { BookService } from 'src/app/services/book.service';
import { BookshelfService } from 'src/app/services/bookshelf.service';
import { MovieService } from 'src/app/services/movie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  books: Book[];
  movies: Movie[];

  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  constructor(private tokenStorageService: TokenStorageService,
    private bookService: BookService,
    private bookshelfService: BookshelfService,
    private bookListService: BookListService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.listItems());
    const user = this.tokenStorageService.getUser();
    if (user == null) {
      this.router.navigate(['/login']);
    }
  }

  listItems() {
    // if(this.route.snapshot.paramMap.has("keyword")) {
    //   const keyword = this.route.snapshot.paramMap.get("keyword");
    //   this.searchItems(keyword);
    // }else if(this.route.snapshot.paramMap.has("cat"))  {
    //   const category = this.route.snapshot.paramMap.get("cat");
    //   this.handleListProductByCategory(category);
    // } else{
    this.handleListAll();
    // }
  }

  // searchItems(keyword: string) {
  //   this.productSrevice.searchProduct(keyword).subscribe(
  //     data => this.products = data;
  //   )
  // }

  // handleItemByCategory(category: string) {
  //   this.itemService.getItemListPaginate(this.pageNumber-1, this.pageSize, this.category).subscribe(this.processResult());
  // }

  handleListAll() {
    this.bookService.getAllBook(this.pageNumber - 1, this.pageSize).subscribe(this.processResult());
  }

  addToList(book: Book) {
    this.bookListService.addToBookTodoList(book);
  }


  processResult() {
    return data => {
      this.books = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    }
  }
}
