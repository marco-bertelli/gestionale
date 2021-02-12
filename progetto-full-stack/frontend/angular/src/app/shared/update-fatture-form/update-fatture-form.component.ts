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

    
  ngOnInit(): void {
    this.loadBody();
  }

  loadBody(){
    this.call.getSingolo("DocDetail",this.prodotto.codice).subscribe(res=>{
      this.body=res;
    })
  }

  setheader(event:string){
    this.header=event;
    this.staticTabs.setActiveTab(2);
    console.log(this.header)
  }


}
