import { Component, OnInit } from '@angular/core';
import { HttpcomminicationsService } from 'src/app/core/http-communication/httpcomminications.service';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit {

  constructor(private http:HttpcomminicationsService) { }

  ordine:any;

  ngOnInit(): void {
    this.loadOrdine();
  }
  loadOrdine(){
    this.http.getCall("/getTable?table=ordini").subscribe(res=>{
      this.ordine=res;
    })
   
  }

}
