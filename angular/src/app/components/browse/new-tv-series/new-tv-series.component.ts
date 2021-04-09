import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TvSeries } from 'src/app/common/tvSeries';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TvListService } from 'src/app/services/tv-list.service';
import { TvService } from 'src/app/services/tv.service';
import { TvshelfService } from 'src/app/services/tvshelf.service';

@Component({
  selector: 'app-new-tv-series',
  templateUrl: './new-tv-series.component.html',
  styleUrls: ['./new-tv-series.component.css']
})
export class NewTvSeriesComponent implements OnInit {

  tvSeries: TvSeries[];

  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;
  
  isAdmin = false;

  tvSeriesForm: FormGroup;
  editingTvSeries: TvSeries;

  constructor(private tokenStorageService: TokenStorageService,
    private tvService: TvService,
    private tvshelfService: TvshelfService,
    private tvListService: TvListService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      const user = this.tokenStorageService.getUser();
      if (user == null) {
        this.router.navigate(['/login']);
      }
  
      if(user.roles.includes('ADMIN')){
        this.isAdmin= true;
      }
  
      this.route.paramMap.subscribe(() => this.listItems());
  
      this.tvSeriesForm = this.formBuilder.group({
        'id': ['', Validators.required],
        'title': [''],
        'description': [''],
        'year': [''],
        'image_url': ['']
      });
      
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
      this.tvService.getAllTv(this.pageNumber - 1, this.pageSize).subscribe(this.processResult());
    }
  
    addToList(tvSeries: TvSeries) {
      this.tvListService.addToTvTodoList(tvSeries);
    }
  
    openEditTvSeriesModal(tvSeries: TvSeries) {
      this.editingTvSeries = tvSeries;
      this.tvSeriesForm.patchValue(tvSeries);
    }
  
    updateTvSeries() {
      const formValue = this.tvSeriesForm.value;
      
      this.editingTvSeries.title = formValue.title;
      this.editingTvSeries.year = formValue.year;
      this.editingTvSeries.description = formValue.description;
  
      this.tvService.updateTvSeries(this.editingTvSeries).subscribe();
  
    }


  processResult() {
    return data => {
      this.tvSeries = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    }
  }

}
