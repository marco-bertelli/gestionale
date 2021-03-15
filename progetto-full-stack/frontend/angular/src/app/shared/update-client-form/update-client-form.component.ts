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

  @Input()
  campi:any=[];


  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter();

  form = new FormGroup({

  });

  constructor(private http: CallService) { }

  ngOnInit(): void {
    this.campi.forEach((res:string) => {
      this.form.addControl(
        res,
        new FormControl()
      );
    });
  }

  ngOnChanges(changes:SimpleChanges){
    this.campi.forEach((res:string) => {
      console.log(this.campi)
      this.form.setControl(
        res,
        new FormControl(this.cliente[res], Validators.required)
      )
    });
  }

  change(){
    console.log(this.form.value)
    this.submitEvent.emit(this.form.value)
  }



}
