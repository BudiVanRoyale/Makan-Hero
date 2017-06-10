import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {toast} from '../../toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [toast]
})
export class LoginComponent implements OnInit {

  private emailAdd: string;
  private password: string;
  private url: string = "http://192.168.1.167:8000/api/v1/auth";
  public token: string;

  constructor(private http: Http, private router: Router, private ts: toast) {
    //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.token = currentUser && currentUser.token;

    if (localStorage.getItem('currentUser') != null){
      this.router.navigate(['/feed']);
    }
  }

  ngOnInit() {

  }


  login() {
    let body = 'email=' + this.emailAdd + '&password=' + this.password;
    const headers = new Headers(
      {
        'content-type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      });
    const options = new RequestOptions({headers: headers});
    this.http.post(this.url, body, options).map(res => res.json())
      .subscribe(
        messages => {
          this.token = messages.token;
          localStorage.setItem('currentUser', this.token);
          this.router.navigate(['/feed']);
          console.log(localStorage.getItem('currentUser'));
        },
        error => this.ts.showToast("Try lagi b0ss")
      );
  };

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }


}
