import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  //link : string = "";
  

  constructor(public router: Router, location: Location){
          //this.link=location.path();
          //console.log(this.link);
  }

}
