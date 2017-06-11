import {Component, OnInit} from '@angular/core';
import {toast} from '../../toast';
import {Router} from '@angular/router';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [toast]
})


export class FeedComponent implements OnInit {

  private url = 'http://192.168.1.167:8000/api/v1/foods';
  public msgs: any;
  constructor(private ts: toast, private router: Router, private http: Http) {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['/']);
    }

    this.getFeed();
    console.log(this.msgs);
  }

  getFeed() {
    const headers = new Headers(
      {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'bearer ' + localStorage.getItem('currentUser')
      });
    const options = new RequestOptions({headers: headers});
    this.http.get(this.url, options).map(res => res.json()).subscribe(msg => {
      console.log(msg.data);
      this.msgs = msg.data;
      console.log('calling');
      //localStorage.setItem('feed', JSON.parse(msg));

    }), err => this.ts.showToast('Error b0ss');


  }


  ngOnInit() {


  }

  viewDetails(id) {
    this.router.navigate(['/details', id]);
  }




}
