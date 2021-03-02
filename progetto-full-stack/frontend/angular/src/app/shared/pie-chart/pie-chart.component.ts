import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { elementAt } from 'rxjs/operators';
import { CallService } from 'src/app/core/calls/call.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor(private http:CallService){}

  data = [];
  data1 = [];

  dataList: String[] = [];
  chartData: Number[] = []

  public chartLabels: Array<String> = [];
  public customerCode: Array<String> = [];



  ngOnInit(): void {
    this.http.getCostumerRagioneSociale().subscribe(res=>{
      this.data = res;
      this.createChartLabels();
      this.createChartDatasets();
    })
  }

  createChartLabels(){
    var i = 0;
    this.data.forEach(element => {
      this.chartLabels[i] = JSON.parse(JSON.stringify(element)).ragione_sociale;
      this.customerCode[i] = JSON.parse(JSON.stringify(element)).codice;
      i++
    })
  }

  createChartDatasets(){
    for (let index = 0; index < this.customerCode.length; index++) {
      this.http.getNumDocCustomer("'"+this.customerCode[index].toString()+"'").subscribe(res => {
       this.data1 = res;
       this.data1.forEach(element => {
        this.chartData[index]=JSON.parse(JSON.stringify(element)).numDoc;
       });
      })
    }
  }

  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: this.chartData }
  ];

 public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
