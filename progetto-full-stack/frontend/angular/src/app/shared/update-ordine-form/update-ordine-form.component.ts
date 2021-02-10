import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-update-ordine-form',
  templateUrl: './update-ordine-form.component.html',
  styleUrls: ['./update-ordine-form.component.scss']
})
export class UpdateOrdineFormComponent implements OnInit {

  @Input()
  ordine:any;

  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter();

  @Input()
  campi:any=[];

  clienti:any;


  form = new FormGroup({

});

  constructor(private http:CallService) { }

  ngOnInit(): void {

    this.http.getTable("clienti").subscribe(res=>{
      console.log(res);
      this.clienti=res;
    });

    this.campi.forEach((res: string)=> {
      console.log(res);
      this.form.addControl(
        res,
        new FormControl()
       
      );
    });
    

  }

ngOnChanges(changes: SimpleChanges) {

  this.campi.forEach((res: string)=> {
    //console.log(this.prodotto[res])
    this.form.setControl(
      res,
      new FormControl(this.ordine[res], Validators.required)
    );
  });

}
change(){console.log(this.form.value)
  this.submitEvent.emit(this.form.value)
}

Update(){
  this.http.getTable("clienti").subscribe(res=>{
    this.clienti=res;
  })
}

changeCliente(id:number){

  this.form.setControl(
    "clienti",
    new FormControl(id,Validators.required)
  );

}


}
