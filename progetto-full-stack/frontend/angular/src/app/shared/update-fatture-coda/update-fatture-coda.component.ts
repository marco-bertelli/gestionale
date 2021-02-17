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
    this.form.addControl(
      res,
      new FormControl(this.prodotto[res], Validators.required),
    );
  });
  
  this.campi.forEach((res: string)=> {
    //console.log(this.prodotto[res])
    this.form.addControl(
      res,
      new FormControl(this.prodotto[res], Validators.required)
    );

   this.form.controls[res].valueChanges.subscribe(val=>{
      this.form.setControl(
        "SummaryDiscountAmount",
        new FormControl(this.form.get("SummaryDiscount")?.value*(this.form.get("GoodsAmount")?.value+this.form.get("ServiceAmount")?.value)/100, Validators.required)
      );

      this.form.setControl(
        "TotalDiscount",
        new FormControl(this.form.get("RowsDiscount")?.value+this.form.get("SummaryDiscountAmount")?.value, Validators.required)
      );

      this.form.setControl(
        "TotalTaxableAmount",
        new FormControl((this.form.get("GoodsAmount")?.value+this.form.get("ServiceAmount")?.value)-this.form.get("TotalDiscount")?.value, Validators.required)
      );

      this.form.setControl(
        "FinalAmount",
        new FormControl((this.form.get("TotalTaxableAmount")?.value+this.form.get("TotalTaxesAmount")?.value), Validators.required)
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
