import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TabsetComponent } from 'ng-uikit-pro-standard';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-update-fatture-form',
  templateUrl: './update-fatture-form.component.html',
  styleUrls: ['./update-fatture-form.component.scss']
})
export class UpdateFattureFormComponent implements OnInit {

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

  body:any;

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
   this.loadBody();

   this.coda = Object.assign({}, this.coda);
    
  }

  loadBody(){
    this.call.getSingolo("DocDetail",this.prodotto.codice).subscribe(res=>{
      this.body=res;
      this.createCoda(this.body);

    })
  }

  updateBody(event:any){
    console.log(event)
    for (let index = 0; index < this.body.length; index++) {
      if(this.body[index].DocLine===event.DocLine) this.body[index]=event;
      
    }
    this.createCoda(this.body)

  }

  setheader(event:string){
    this.header=event;
    this.staticTabs.setActiveTab(2);
  
  }

  createCoda(body:any){
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
    this.coda.Codice=this.prodotto.codice;
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



}
