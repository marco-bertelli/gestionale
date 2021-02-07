import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-update-prod-form',
  templateUrl: './update-prod-form.component.html',
  styleUrls: ['./update-prod-form.component.scss']
})
export class UpdateProdFormComponent implements OnInit {

  @Input()
  prodotto:any;

  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter();

  @Input()
  campi:any=[];

  category:any;


  form = new FormGroup({
    
});

  constructor(private http:CallService) { }

  ngOnInit(): void {

    this.http.getTable("categorie").subscribe(res=>{
      this.category=res;
    });

    this.campi.forEach((res: string)=> {
      this.form.addControl(
        res,
        new FormControl()
      );
    });
    
  }

ngOnChanges(changes: SimpleChanges) {

  this.campi.forEach((res: string)=> {
    console.log(this.prodotto[res])
    this.form.setControl(
      res,
      new FormControl(this.prodotto[res], Validators.required)
    );
  });
    
}
change(){
  this.submitEvent.emit(this.form.value)
}

Update(){
  this.http.getTable("categorie").subscribe(res=>{
    this.category=res;
  })
}

changeCategory(id:number){
  this.form = new FormGroup({
    "id": new FormControl(this.prodotto.id, Validators.required),
    "codice": new FormControl(this.prodotto.codice, Validators.required),
    "nome": new FormControl(this.prodotto.nome, Validators.required),
    "descrizione": new FormControl(this.prodotto.descrizione, Validators.required),
    "categoria": new FormControl(id, Validators.required),
    "prezzo": new FormControl(this.prodotto.prezzo, Validators.required),
});
}



}
