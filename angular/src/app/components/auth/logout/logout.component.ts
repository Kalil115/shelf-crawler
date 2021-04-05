import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    
    if(this.tokenStorageService.getToken()){
      this.logout();
    }
    this.router.navigate(['']);
  }

  logout(): void {
    this.tokenStorageService.signout();
    window.location.reload();
  }
}
