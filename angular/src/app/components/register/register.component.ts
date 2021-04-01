import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    password: null,
    email: null
  }

  isSuccessful = false;;
  isSignupFailed = false;
  errorMessage = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {username, password, email} = this.form;
    
    this.authService.register(username, password, email).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignupFailed = false;
      }, err => {
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
      }
    );
  }

}
