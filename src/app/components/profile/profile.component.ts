import {Component, OnInit} from '@angular/core';
import {Router}from '@angular/router';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {toast} from '../../toast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [toast]
})
export class ProfileComponent implements OnInit {

  private url = 'http://192.168.1.167:8000/api/v1/me';
  private email: string;
  private pp: string = "https://lh6.googleusercontent.com/-C8EOOPgV2jA/VKhomirnV-I/AAAAAAAAAAs/9iynth2mnmo/superman-facebook.jpg";
  private name: string;
  private points: string;
  private saved: string;
  private shared: string;

  constructor(private router: Router, private http: Http, private ts: toast) {
    this.getUserData();
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  getUserData() {
    const headers = new Headers(
      {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'bearer ' + localStorage.getItem('currentUser')
      });
    const options = new RequestOptions({headers: headers});
    this.http.get(this.url, options).map(res => res.json()).subscribe(msg => {
      this.email = msg.user.email;
      this.name = msg.user.name;
      this.points = msg.user.points;
      this.saved = msg.user.saved;
      this.shared = msg.user.offered;
    }), err => this.ts.showToast('Error b0ss');
  }

}
