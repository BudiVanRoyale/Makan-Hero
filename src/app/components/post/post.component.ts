import {Component, OnInit} from '@angular/core';
import * as jQuery from 'jquery';
import {Http} from '@angular/http';
import {toast} from '../../toast';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [toast]
})
export class PostComponent implements OnInit {

  private postTitle: string;
  private postDesc: string;
  private dietryType: string;
  private lat: number;
  private loc: string;
  private halal: boolean;
  private veg: boolean;
  private expiry: any;

  private long: number;


  constructor(private http: Http, private ts: toast) {

  }

  ngOnInit() {
    this.getLat();
    this.getLong();
  }

  submitPost() {
    this.getDiet();
    let ob = {
      'title': this.postTitle,
      'lat': this.lat,
      'long': this.long,
      'loc_name': this.loc,
      'body': this.postDesc,
      'type': this.dietryType,
      'expiry': Date.now() + (this.expiry * 60 * 60 * 1000)
    };
    if ((this.postTitle == null) || (this.loc == null) || (this.expiry == null)) {
      this.ts.showToast('Yo b0ss please fill in title/location/expiry!');
    }
    console.log(ob);
  }

  getLat() {
    navigator.geolocation.getCurrentPosition(position => this.lat = position.coords.latitude);
  }

  getLong() {
    navigator.geolocation.getCurrentPosition(position => this.long = position.coords.longitude);
  }

  getDiet() {
    if (this.halal = true) {
      this.dietryType = 'halal';
    } else if (this.veg = true) {
      this.dietryType = 'veg';
    } else if ((this.veg = true) && (this.halal = true)) {
      this.dietryType = 'halal & veg';
    } else {
      this.dietryType = '-';
    }
  }

}
