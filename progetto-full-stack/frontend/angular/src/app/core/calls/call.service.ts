import { Injectable } from '@angular/core';
import { HttpcomminicationsService } from '../http-communication/httpcomminications.service';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private http: HttpcomminicationsService) { }

  public updateProd(prod:string){
    return this.http.putCall("/changeProdotti",prod);
  }

  public updateClient(client:string){
    return this.http.putCall("/changeClienti",client);
  }
  
  public updateOrdine(ordine:string){
    return this.http.putCall("/changeOrdini",ordine);
  }
  getTable(tname:string){
    return this.http.getCall("/getTable?table="+tname);
  }
  search(option:string,value:string){
    return this.http.getCall("/search"+option+'&string="'+value+'"');
  }
  insertCall(body:any,table:string){
    

    return this.http.postCall("/insert?table="+table,body);
  }
  deleteCall(body:any,table:string){
    return this.http.postCall("/delete?table="+table,body);
  }
}
