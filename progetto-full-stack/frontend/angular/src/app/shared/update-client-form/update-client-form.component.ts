import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-update-client-form',
  templateUrl: './update-client-form.component.html',
  styleUrls: ['./update-client-form.component.scss']
})
export class UpdateClientFormComponent implements OnInit {

  @Input()
  cliente: any;

  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter();

  form = new FormGroup({
    "id" : new FormControl("", Validators.required),
    "codice" : new FormControl("",Validators.required),
    "ragione_sociale" : new FormControl("",Validators.required),
    "indirizzo" : new FormControl("", Validators.required),
    "citta" : new FormControl("",Validators.required)
  })

  constructor(private http: CallService) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges){
    this.form = new FormGroup({
      "id" : new FormControl(this.cliente.id, Validators.required),
      "codice" : new FormControl(this.cliente.codice, Validators.required),
      "ragione_sociale" : new FormControl(this.cliente.ragione_sociale, Validators.required),
      "indirizzo" : new FormControl(this.cliente.indirizzo, Validators.required),
      "citta" : new FormControl(this.cliente.citta, Validators.required),
    })
  }

  change(){
    this.submitEvent.emit(this.form.value) //fa evento con i valori presenti nel form
  }



}
