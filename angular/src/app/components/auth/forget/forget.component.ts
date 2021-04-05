import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  form: any = {
    email: null
  };

  isSuccessful = undefined;
  errorMessage = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.auth.reset(this.form.email).subscribe(
      ok => this.isSuccessful = true,
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
      }
    );
  }
}
