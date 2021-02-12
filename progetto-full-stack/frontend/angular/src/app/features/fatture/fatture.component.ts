import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {

  constructor(private http:CallService) { }

  fatture:any;

  ngOnInit(): void {
    this.loadProd();
  }
  loadProd(){
    this.http.getTable("DocMaster").subscribe(res=>{
      this.fatture=res;
    })
   
  }

}
