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

  category:any;


  form = new FormGroup({
    "id": new FormControl("", Validators.required),
    "codice": new FormControl("", Validators.required),
    "nome": new FormControl("", Validators.required),
    "descrizione": new FormControl("", Validators.required),
    "categoria": new FormControl("", Validators.required),
    "prezzo": new FormControl("", Validators.required),
    
});

  constructor(private http:CallService) { }

  ngOnInit(): void {

    this.http.getTable("categorie").subscribe(res=>{
      this.category=res;
    })
    
  }

  

  ngOnChanges(changes: SimpleChanges) {

    this.form = new FormGroup({
      "id": new FormControl(this.prodotto.id, Validators.required),
      "codice": new FormControl(this.prodotto.codice, Validators.required),
      "nome": new FormControl(this.prodotto.nome, Validators.required),
      "descrizione": new FormControl(this.prodotto.descrizione, Validators.required),
      "categoria": new FormControl(this.prodotto.categoria, Validators.required),
      "prezzo": new FormControl(this.prodotto.prezzo, Validators.required),
      
  });
    
}
change(){
  this.submitEvent.emit(this.form.value)
}

loadProd(){

}



}
