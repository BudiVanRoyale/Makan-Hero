import {Component, OnInit} from '@angular/core';
import * as jQuery from 'jquery';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {toast} from "../../toast";
import { FeedComponent } from '../feed/feed.component'


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [toast, FeedComponent]
})
export class DetailsComponent implements OnInit {

  private url: string = "http://192.168.1.167:8000/api/v1/foods/" + 1
  private details: any ;


  constructor(private http:Http,private ts:toast,private fc:FeedComponent) {
    this.getDetails();
  }

  ngOnInit() {

  }

  getDetails(){
    const headers = new Headers(
      {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'bearer ' + localStorage.getItem('currentUser')
      });
    const options = new RequestOptions({headers: headers});
     this.http.get(this.url, options).map(res => res.json()).subscribe(msg => {
       console.log(msg.data);
       this.details = msg.data;
     }), err => this.ts.showToast("Error b0ss");


    console.log("dasdsadsadsa" + this.details);
  }


}
