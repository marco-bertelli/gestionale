import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor(private http:CallService){}

  bCol:String = 'rgba(43, 43, 44, 0.63)';
  bgCol1: String = 'rgba(54, 162, 235, 0.2)';
  bgCol2: String = 'rgba(145, 145, 145, 0.58)';

  currentYear: number=new Date().getFullYear();
  lastYear:number= this.currentYear-1;

  dataRes = [];


  createChartDataSets(year: number){
    let chartData: Number[] = []
    for (let month = 0; month <= 12; month++) {
      this.http.getTotalAmountMonthYear(month,year).subscribe(res=>{
        this.dataRes = res;
        this.dataRes.forEach(element =>{
          chartData[month] = JSON.parse(JSON.stringify(element)).Tot;
        })
      })
    }

    return chartData;
  }


  ngOnInit(): void {}

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: this.createChartDataSets(this.currentYear), label: 'Current year' },
    { data: this.createChartDataSets(this.lastYear), label: 'Last year' }
  ];

  public chartLabels: Array<any> = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre','Ottobre', 'Novembre', 'Dicembre'];



  public chartColors: Array<any> = [
    { //THIS YEARS
      backgroundColor: [ 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)'],
      borderColor: [ this.bCol, this.bCol, this.bCol, this.bCol, this.bCol, this.bCol, this.bCol,this.bCol, this.bCol,this.bCol, this.bCol, this.bCol ],
      borderWidth: 1,
    },
    { //LAST YEARS
      backgroundColor: [ 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)', 'rgba(145, 145, 145, 0.58)'],
      borderColor: [ this.bCol, this.bCol, this.bCol, this.bCol, this.bCol, this.bCol, this.bCol,this.bCol, this.bCol,this.bCol, this.bCol, this.bCol ],
      borderWidth: 1,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
