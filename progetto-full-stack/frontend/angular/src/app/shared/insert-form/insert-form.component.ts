import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.campi.forEach((res: string)=> {
      this.form.addControl(
        res,
        new FormControl()
      );
    });

  }

  change(){
    this.submitEvent.emit(this.form.value)
  }


}
