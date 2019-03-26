import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService , private router: Router) {}

  ngOnInit() {
    firebase.initializeApp ({
      apiKey: 'AIzaSyCycuwLV9ZMqGQIUtPe9KkXvGOXqs3-sBU',
      authDomain: 'bloggersloba.firebaseapp.com',
    });
   }
   signOut() {
     this.authService.signout();
     this.router.navigate(['/signin']);
   }
   signin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }
}
