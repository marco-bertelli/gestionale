import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/core/calls/call.service';
import { HttpcomminicationsService } from 'src/app/core/http-communication/httpcomminications.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {

  constructor(private http:CallService) { }

  clienti:any;

  ngOnInit(): void {
    this.loadProd();
  }
  loadProd(){
    this.http.getTable("clienti").subscribe(res=>{
      this.clienti=res;
    })
   
  }

}
