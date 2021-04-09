import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private roles: string[] = [];
  isLoggedin = false;
  showAdminBoard = false;
  isShelf = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedin = !!this.tokenStorageService.getToken();
    
    if(this.isLoggedin) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes("ADMIN");
      this.username = user.username;
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
        (event: NavigationEnd) => {
          this.isShelf = event.url.startsWith('/shelf/');
        });      
    }
  }

}


