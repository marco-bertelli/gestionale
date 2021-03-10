import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  link : string = "";
  

  constructor(private router: Router, location: Location){
          this.link=location.path();
          //console.log(this.link);
    }
}
