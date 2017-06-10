import { Component, OnInit } from '@angular/core';
import { toast } from '../../toast';
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [toast]
})
export class FeedComponent implements OnInit {

  constructor(private ts:toast,private router:Router) {
    if (localStorage.getItem('currentUser') == null){
      this.router.navigate(['/']);
    }else{
      this.ts.showToast("Welcome br0ski!");
    }
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude);
    });


  }

}
