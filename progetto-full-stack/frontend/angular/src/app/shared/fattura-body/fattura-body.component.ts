
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-fattura-body',
  templateUrl: './fattura-body.component.html',
  styleUrls: ['./fattura-body.component.scss']
})
export class FatturaBodyComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  @Output()
  changeEvent: EventEmitter<any> = new EventEmitter();

  validatingForm!: FormGroup;

  @Input()
  elements: any = [];

  @Input()
  tname:string="";

  @Input()
  search_param:string="";

  @Input()
  search_table:string="";

  prodToChange="";

  previous: any = [];

  @Input()
  headElements:any = [];


  constructor(private cdRef: ChangeDetectorRef,private call:CallService,private toast: ToastService) {  }

  ngOnInit() {
    console.log(this.elements)
  }

  ngAfterViewInit() {
   
  }
  
  delete(el:string){
 
    this.call.deleteCall(el,this.tname).subscribe(res=>{
      this.update();
    });
    
  }
  change(element:string){
    console.log(element)
  
      this.changeEvent.emit(element);

  }
  changeP(el:string){
    this.prodToChange=el;
  }

  update(){
    this.changeEvent.emit()
  }

  insert(event:string){
    console.log("eseguo insert")
    this.call.insertCall(event,this.tname).subscribe(res=>{
      this.update();
    });
  }

}
