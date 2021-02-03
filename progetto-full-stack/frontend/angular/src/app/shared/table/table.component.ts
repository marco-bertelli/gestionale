
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  @Output()
  categoryEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter();

  @Input()
  elements: any = [];

  prodToChange="";

  previous: any = [];

  @Input()
  headElements:any = [];

 

  constructor(private cdRef: ChangeDetectorRef,private call:CallService,private toast: ToastService) { 
   
  }

  ngOnInit() {
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
    console.log(el);
  }
  change(element:string){
    this.call.updateProd(element).subscribe(res=>{
      //mettere gestione di notifica
      console.log(res)
      if(res.affectedRows==1)  this.toast.success('prodotto modificato');
      else this.toast.error('errore interno '+ res);
    });
    
  }
  changeP(el:string){
    this.prodToChange=el;
    
  }

  sendCategory(id:number){
    this.categoryEvent.emit(id);
  }

}
