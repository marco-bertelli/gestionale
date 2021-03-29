
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TabsetComponent } from 'ng-uikit-pro-standard';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-insert-fatture',
  templateUrl: './insert-fatture.component.html',
  styleUrls: ['./insert-fatture.component.scss']
})
export class InsertFattureComponent implements OnInit {

  constructor(private call:CallService){}

  //campi in input di base
  @Input()
  prodotto:any;

  @Input()
  search_param:any;

  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter();

  @Input()
  campi:any=[];

  @Input()
  search_table:string="";
  //recupero la tabella per settare manualmente a che step andare
  @ViewChild('staticTabs', { static: true })
  staticTabs!: TabsetComponent;
  //recupero le varie parti della fattura
  header:any;

  body:Array<any> = [];

  coda:any={
    "Codice":"",
    "GoodsAmount":0,
    "ServiceAmount":0,
    "RowsDiscount":0,
    "SummaryDiscount":0,
    "SummaryDiscountAmount":0,
    "TotalDiscount":0,
    "TotalTaxableAmount":0,
    "TotalTaxesAmount":0,
    "FinalAmount":0
  };

  campiCoda=[
    "Codice",
    "GoodsAmount",
    "ServiceAmount",
    "RowsDiscount",
    "SummaryDiscount",
    "SummaryDiscountAmount",
    "TotalDiscount",
    "TotalTaxableAmount",
    "TotalTaxesAmount",
    "FinalAmount"
  ]


  ngOnInit(): void {

   this.coda = Object.assign({}, this.coda);

  }


  updateBody(event:any){
    console.log(event)
    for (let index = 0; index < this.body.length; index++) {
      if(this.body[index].DocLine===event.DocLine) this.body[index]=event;

    }
    this.createCoda(this.body)

  }

  insertBody(event:any){
    console.log(event)
    this.body.push(event);
    this.createCoda(this.body);
  }


  delete(event:any){

    //Removing body riga
    this.body.forEach((element,index)=>{
    if(element.DocLine==event.DocLine) this.body.splice(index,1);
    });
    //si usa slice per non lasciare lo spazio vuoto

   this.createCoda(this.body);
  }

  setheader(event:any){
    this.header=event;
    this.createCoda(this.body);
    this.staticTabs.setActiveTab(2);


  }

  createCoda(body:any){
    console.log(this.prodotto)
    //azzera la coda
    this.coda={
      "Codice":"",
      "GoodsAmount":0,
      "ServiceAmount":0,
      "RowsDiscount":0,
      "SummaryDiscount":"",
      "SummuryDiscountAmount":0,
      "TotalDiscount":0,
      "TotalTaxableAmount":0,
      "TotalTaxesAmount":0
    };

    //setta il codice
    this.prodotto ? this.coda.Codice=this.prodotto.codice : this.coda.Codice=this.header.codice;
    //riempie i vari valori
    for (let index = 0; index < this.body.length; index++) {
      //totale merci o servizi
      if(this.body[index].LineType==="M") this.coda.GoodsAmount+=body[index].NetPrice;
      else this.coda.ServiceAmount+=body[index].NetPrice;

      this.coda.RowsDiscount+=body[index].DiscountAmount;

      this.coda.TotalDiscount+=body[index].DiscountAmount;

      this.coda.TotalTaxesAmount+=body[index].AmountOfTaxes;
    }

  }

  getCoda(){
      //soluzione momentanea per input
      return {...this.coda}
  }

  save(event:any){
    this.coda=event;

    const fattura={
      "header":this.header,
      "body":this.body,
      "coda":this.coda
    }

    this.call.insertFattura(fattura).subscribe(res=>{
      console.log(res)
    })
  }
}
