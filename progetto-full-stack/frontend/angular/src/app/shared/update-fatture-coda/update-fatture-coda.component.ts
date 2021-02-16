import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallService } from 'src/app/core/calls/call.service';


@Component({
  selector: 'app-update-fatture-coda',
  templateUrl: './update-fatture-coda.component.html',
  styleUrls: ['./update-fatture-coda.component.scss']
})
export class UpdateFattureCodaComponent implements OnInit {

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

  category:any;

  form = new FormGroup({
    
});

  constructor(private http:CallService) {

   }

  ngOnInit(): void {

    this.http.getTable(this.search_table).subscribe(res=>{
      this.category=res;
    });
    
    

    this.campi.forEach((res: string)=> {
      this.form.addControl(
        res,
        new FormControl()
      );
    });
  }

ngOnChanges() {
  
  this.campi.forEach((res: string)=> {
    //console.log(this.prodotto[res])
    this.form.setControl(
      res,
      new FormControl(this.prodotto[res], Validators.required)
    );

    this.form.controls[res].valueChanges.subscribe(val=>{
      this.form.setControl(
        "NetPrice",
        new FormControl(this.form.get("Qty")?.value*this.form.get("UnitAmount")?.value, Validators.required)
      );
      this.form.setControl(
        "DiscountAmount",
        new FormControl((this.form.get("NetPrice")?.value*this.form.get("DiscountFormula")?.value)/100, Validators.required)
      );
      this.form.setControl(
        "TaxableAmount",
        new FormControl(this.form.get("NetPrice")?.value-this.form.get("DiscountAmount")?.value, Validators.required)
      );

      this.form.setControl(
        "AmountOfTaxes",
        new FormControl((this.form.get("TaxableAmount")?.value*this.form.get("TaxCode")?.value)/100, Validators.required)
      );

      this.form.setControl(
        "TotalAmount",
        new FormControl(this.form.get("TaxableAmount")?.value+this.form.get("AmountOfTaxes")?.value, Validators.required)
      );
     
    })
  }); 
}
change(){
  
  this.submitEvent.emit(this.form.value)
}

Update(){
  this.http.getTable(this.search_table).subscribe(res=>{
    this.category=res;
  })
}

changeCategory(id:number){
 
    this.form.setControl(
      this.search_param,
      new FormControl(id,Validators.required)
    );
  
}

}
