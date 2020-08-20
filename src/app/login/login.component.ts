import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    username = new FormControl('');
    password = new FormControl('');
    submitMessage: string;

    public loginForm : FormGroup;

    constructor(private routerService:RouterService, private authService: AuthenticationService) {
      this.submitMessage = '';
    }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    })
  }

    loginSubmit() {
      this.authService.authenticateUser({username: this.username.value, password: this.password.value}).subscribe(token => {
        this.authService.setBearerToken(token);
        this.routerService.routeToDashboard();
      },
      error => {
        if (error.status === 404) {
          this.submitMessage = error.message;
        } else {
          this.submitMessage = error.error.message;
        }
      });
    }
}
