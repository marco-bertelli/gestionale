import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { CallService } from 'src/app/core/calls/call.service';


@Component({
  selector: 'app-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.scss']
})
export class TableSortComponent implements OnInit,AfterViewInit{

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

  form = new FormGroup({
    "firstName": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
});

  constructor(private cdRef: ChangeDetectorRef,private call:CallService,private toast: ToastService) {  }

  ngOnInit() {
    console.log(this.elements)


    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();

  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  delete(el:string){

    this.call.deleteCall(el,this.tname).subscribe(res=>{

      this.update();
    });

  }
  change(element:string){
    console.log(element)
    this.call.updateProd(element,this.tname).subscribe(res=>{
      //mettere gestione di notifica
      console.log(res)
      if(res.affectedRows==1)  this.toast.success('Modifica avvenuta con successo!');
      else this.toast.error('errore interno '+ res);

      this.changeEvent.emit();
    });

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
      console.log(res)
      this.update();
    });
  }


}
