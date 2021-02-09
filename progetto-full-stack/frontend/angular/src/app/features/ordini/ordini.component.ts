import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/core/calls/call.service';
import { HttpcomminicationsService } from 'src/app/core/http-communication/httpcomminications.service';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit {

  constructor(private http:CallService) { }

  ordine:any;

  ngOnInit(): void {
    this.loadOrdine();
  }
  loadOrdine(){
    this.http.getTable("ordini").subscribe(res=>{
      this.ordine=res;
    })
   
  }

}
