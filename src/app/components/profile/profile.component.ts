import { Component, OnInit } from '@angular/core';
import { Router }from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  private pp: string = "https://lh6.googleusercontent.com/-C8EOOPgV2jA/VKhomirnV-I/AAAAAAAAAAs/9iynth2mnmo/superman-facebook.jpg";

  constructor(private router:Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
