import {Component, OnInit} from '@angular/core';
import * as jQuery from 'jquery';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {toast} from '../../toast';
import * as moment from 'moment';
import {Router} from "@angular/router";


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
  private halal: string;
  private veg: string;
  private expiry: any;

  private long: number;
  private url: string = "http://192.168.1.167:8000/api/v1/foods";


  constructor(private http: Http, private ts: toast, private router: Router) {

  }

  ngOnInit() {
    this.getLat();
    this.getLong();
  }

  submitPost() {
    this.getDiet();
    let ob = {
      'title': this.postTitle,
      'lat': 89,
      'lng': 89,
      'loc_name': this.loc,
      'body': this.postDesc,
      'type': this.dietryType,
      'expiry': moment().utc().add(this.expiry, 'hours').format('YYYY-MM-DD hh:mm:ss')
    };
    if ((this.postTitle == null) || (this.loc == null) || (this.expiry == null)) {
      this.ts.showToast('Yo b0ss please fill in title/location/expiry!');
    }

    const headers = new Headers(
      {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'bearer ' + localStorage.getItem('currentUser')
      });
    const options = new RequestOptions({headers: headers});
    this.http.post(this.url, ob, options).map(res => res.json())
      .subscribe(
        messages => {
          this.ts.showToast("Posted successfully");
          this.router.navigate(['/feed']);
        },
        error => console.log(ob)
      );

  }

  getLat() {
    navigator.geolocation.getCurrentPosition(position => this.lat = position.coords.latitude);
  }

  getLong() {
    navigator.geolocation.getCurrentPosition(position => this.long = position.coords.longitude);
  }

  getDiet() {
    if ((this.veg == "veg") && (this.halal == "halal")) {
      this.dietryType = 'halal,veg';
    } else if (this.veg == "veg") {
      this.dietryType = 'veg';
    } else if (this.halal == "halal") {
      this.dietryType = 'halal';
    } else {
      this.dietryType = 'others';
    }
  }

}
