import { Injectable } from '@angular/core';
import { HttpcomminicationsService } from '../http-communication/httpcomminications.service';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private http: HttpcomminicationsService) { }

  updateProd(prod:string,tname:string){
    return this.http.putCall("/change?table="+tname,prod);
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
  updateCall(body:any,table:string){
    return this.http.putCall("/update?table="+table,body);
  }
  deleteCall(body:any,table:string){
    return this.http.postCall("/delete?table="+table,body);
  }
  getSingolo(table:string,codice:string){
    return this.http.getCall("/getSingolo?table="+table+"&codice="+codice);
  }
  getUser(table:string,username:string, password:string){
    return this.http.getCall("/getUser?table="+table+"&username="+username+"&password="+password);
  }

  //DASHBOARD
  getCostumerRagioneSociale(){
    return this.http.getCall("/getCostumerRagioneSociale");
  }
  getNumDocCustomer(codCustomer:string){
    return this.http.getCall("/getNumDocCustomer?codCustomer="+codCustomer);
  }
  getTotalAmountCustomer(codCustomer:string){
    return this.http.getCall("/getTotalAmountCustomer?codCustomer="+codCustomer);
  }
  getTotalAmountMonthYear(month:number, year:number){
    return this.http.getCall("/getTotalAmountYearMonth?year="+year+"&month="+month);
  }
  getTotNumDoc(){
    return this.http.getCall("/getTotNumDoc");
  }
  getTotNumDocCurrentMonth(currentMonth:number, currentYear:number){
    return this.http.getCall("/getTotNumDocCurrentMonth?currentMonth="+currentMonth+"&currentYear="+currentYear);
  }
  getTotAmount(){
    return this.http.getCall("/getTotAmount");
  }
  getTotAmountCurrentMonth(currentMonth:number, currentYear:number){
    return this.http.getCall("/getTotAmountCurrentMonth?currentMonth="+currentMonth+"&currentYear="+currentYear);
  }

  //FATTURE
  insertFattura(body:any){
    return this.http.postCall("/insertFattura",body);
  }


}
