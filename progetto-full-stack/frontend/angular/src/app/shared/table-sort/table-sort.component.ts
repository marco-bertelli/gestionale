import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  prodToChange="";
  clientToChange="";
  ordToChange="";

  previous: any = [];

  @Input()
  headElements:any = [];

  form = new FormGroup({
    "firstName": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
});

  constructor(private cdRef: ChangeDetectorRef,private call:CallService,private toast: ToastService, private router:Router) {  }

  ngOnInit() {
    // console.log(this.elements);
    // console.log(this.tname);

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
    if(this.tname == 'prodotti'){
      this.call.updateProd(element).subscribe(res=>{
        //mettere gestione di notifica
        console.log(res)
        if(res.affectedRows==1)  this.toast.success('prodotto modificato');
        else this.toast.error('errore interno '+ res);

        this.changeEvent.emit();
      });
    }

    if(this.tname == 'clienti'){
      console.log(element)
      this.call.updateClient(element).subscribe(res=>{
        //mettere gestione di notifica
        console.log(res)
        if(res.affectedRows==1)  this.toast.success('cliente modificato');
        else this.toast.error('errore interno '+ res);

        this.changeEvent.emit();
      });
    }

    if(this.tname == 'ordini'){
      console.log(element)
      this.call.updateOrdine(element).subscribe(res=>{
        //mettere gestione di notifica
        console.log(res)
        if(res.affectedRows==1)  this.toast.success('ordine modificato');
        else this.toast.error('errore interno '+ res);

        this.changeEvent.emit();
      });
    }

    this.update();
  }

  changeP(el:string){
    console.log("sono in table sort" + el);
    if(this.tname == 'prodotti')
      this.prodToChange=el;
    if(this.tname == 'clienti')
      this.clientToChange=el;
    if(this.tname == 'ordini')
      this.ordToChange=el
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
