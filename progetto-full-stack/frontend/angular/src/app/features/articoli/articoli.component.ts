import { Component, OnInit } from '@angular/core';
import { HttpcomminicationsService } from 'src/app/core/http-communication/httpcomminications.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.scss']
})
export class ArticoliComponent implements OnInit {

  constructor(private http:HttpcomminicationsService) { }

  article:any;

  ngOnInit(): void {
    this.loadProd();
  }
  loadProd(){
    this.http.getCall("/getProdotti").subscribe(res=>{
      this.article=res;
    })
   
  }

}
