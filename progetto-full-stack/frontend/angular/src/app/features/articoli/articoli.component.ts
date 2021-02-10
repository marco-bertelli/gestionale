import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/core/calls/call.service';
import { HttpcomminicationsService } from 'src/app/core/http-communication/httpcomminications.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.scss']
})
export class ArticoliComponent implements OnInit {

  constructor(private http:CallService) { }

  article:any;

  ngOnInit(): void { this.loadProd(); }

  loadProd(){
    this.http.getTable("prodotti").subscribe(res=>{
      this.article = res
    })
  }

}
