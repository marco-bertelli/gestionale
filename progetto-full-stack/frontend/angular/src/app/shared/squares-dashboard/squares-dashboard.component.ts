import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-squares-dashboard',
  templateUrl: './squares-dashboard.component.html',
  styleUrls: ['./squares-dashboard.component.scss']
})
export class SquaresDashboardComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();

  totNumDoc: number = 0;
  totNumDocCurrentMonth: number = 0;

  totAmount: number = 0;
  totAmountCurrentMonth: number = 0;

  constructor(private http: CallService) { }

  ngOnInit(): void {
    this.getTotNumDoc();
    this.getTotAmount();
    this.getTotNumDocCurrentMonth(this.currentMonth,this.currentYear);
    this.getTotAmountCurrentMonth(this.currentMonth,this.currentYear);
  }

  getTotNumDoc(){
    this.http.getTotNumDoc().subscribe( res=> {
      this.totNumDoc = JSON.parse(JSON.stringify(res[0])).numDocTot;
      // console.log("Tot totNumDoc: "+ this.totNumDoc);
    })
  }

  getTotNumDocCurrentMonth(currentMonth: number, currentYear: number){
    this.http.getTotNumDocCurrentMonth(currentMonth, currentYear).subscribe( res => {
      this.totNumDocCurrentMonth = JSON.parse(JSON.stringify(res[0])).numDocTotCurrentMonth;
      console.log("Tot amount: "+ this.totAmount);
    })
  }

  getTotAmount(){
    this.http.getTotAmount().subscribe( res=> {
      this.totAmount = JSON.parse(JSON.stringify(res[0])).totAmount;
      console.log("Tot amount: "+ this.totAmount);
    })
  }

  getTotAmountCurrentMonth(currentMonth: number, currentYear: number){
    this.http.getTotAmountCurrentMonth(currentMonth, currentYear).subscribe( res => {
      this.totAmountCurrentMonth = JSON.parse(JSON.stringify(res[0])).totAmountCurrentMonth;
    })
  }
}
