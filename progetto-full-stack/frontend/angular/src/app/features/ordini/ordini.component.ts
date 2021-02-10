import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit {

  constructor(private http:CallService) { }

  ordini:any;

  ngOnInit(): void {
    this.loadProd();
  }
  loadProd(){
    this.http.getTable("ordini").subscribe(res=>{
      this.ordini=res;
    })
   
  }

}
