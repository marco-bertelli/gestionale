import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.scss']
})
export class InsertFormComponent implements OnInit {

  @Input()
  campi:any=[];

  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter();

  category:any;

  @Input()
  tname:any;


  form = new FormGroup({});

  constructor(private http:CallService) { }

  ngOnInit(): void {

    this.campi.forEach((res: string)=> {
      this.form.addControl(
        res,
        new FormControl()
      );
    });
    
  }

  

ngOnChanges(changes: SimpleChanges) {}

change(){
  this.http.insertCall(this.form.value,this.tname).subscribe(res=>{
    console.log(res)
    this.submitEvent.emit(this.form.value)
  })
  console.log(this.form.value)
  
}

loadProd(){

}




}
