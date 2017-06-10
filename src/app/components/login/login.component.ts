import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private emailAdd: string;
  private password: string;
  private url: string = "http://192.168.1.167:8000/api/v1/auth";


  constructor(private http: Http) {
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
    this.http.post(this.url, body, options).subscribe((
      data => {
        console.log(data);
      }
    ));

    console.log(this.emailAdd + this.password);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private
  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
