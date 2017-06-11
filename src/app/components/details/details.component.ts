import {Component, Input, OnInit} from '@angular/core';
import * as jQuery from 'jquery';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {toast} from '../../toast';
import {FeedComponent} from '../feed/feed.component';
import {Router} from "@angular/router";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [toast, FeedComponent]
})
export class DetailsComponent implements OnInit {

  private url: string = 'http://192.168.1.167:8000/api/v1/foods' + location.pathname.substr(8) + "/comments";
  private url2: string = 'http://192.168.1.167:8000/api/v1/comments';
  private details: any;
  private title: string;
  private desc: string;
  private location: string;
  private expiry: any;
  private status: string;
  private foodid: string;
  private comments: any;

  constructor(private http: Http, private ts: toast, private fc: FeedComponent,private router:Router) {
    this.getDetails();
  }

  ngOnInit() {

  }

  getDetails() {
    const headers = new Headers(
      {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'bearer ' + localStorage.getItem('currentUser')
      });
    const options = new RequestOptions({headers: headers});
    this.http.get(this.url, options).map(res => res.json()).subscribe(msg => {
      //console.log(msg.data);
      this.desc = msg.data.body;
      this.title = msg.data.title;
      this.location = msg.data.loc_name;
      this.expiry = msg.data.expiry;
      this.foodid = msg.data.id;
      this.status = msg.data.status;
      this.comments = msg.data.comments;
    }), err => this.ts.showToast('Error b0ss');

  }

  postRating() {
    let ob = {
      'food_id': this.foodid,
      'status': $('[name = group1]:checked').val()
    };

    console.log("asdsadas  " + $('[name = group1]').val() + " foooid " +this.foodid);
    const headers = new Headers(
      {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'bearer ' + localStorage.getItem('currentUser')
      });
    const options = new RequestOptions({headers: headers});
    this.http.post(this.url2, ob, options).map(res => res.json())
      .subscribe(
        messages => {
          this.ts.showToast("Posted successfully");
          this.router.navigate(['/feed']);
        },
        error => console.log(ob)
      );
  }

  openModal() {
    $('#myModal').css("display", "block");
  }

  closeModal() {
    $('#myModal').css("display", "none");
  }

}
