import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
  }

  // public chartType: string = 'bar';

  // public chartDatasets: Array<any> = [
  //   { data: [65, 59, 80, 81, 56, 55, 40, 22, 33, 44, 12], label: 'My First dataset' }
  // ];

  // public chartLabels: Array<any> = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre','Ottobre', 'Novembre', 'Dicembre'];

  // public chartColors: Array<any> = [
  //   {
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)',    //gennaio
  //       'rgba(54, 162, 235, 0.2)',    //febbraio
  //       'rgba(255, 206, 86, 0.2)',    //marzo
  //       'rgba(75, 192, 192, 0.2)',    //aprile
  //       'rgba(153, 102, 255, 0.2)',   //maggio
  //       'rgba(255, 159, 64, 0.2)',    //giugno
  //       'rgba(255, 99, 132, 0.2)',    //luglio
  //       'rgba(54, 162, 235, 0.2)',    //agosto
  //       'rgba(255, 206, 86, 0.2)',    //settembre
  //       'rgba(75, 192, 192, 0.2)',    //ottobre
  //       'rgba(153, 102, 255, 0.2)',   //novembre
  //       'rgba(255, 159, 64, 0.2)',    //dicembre
  //     ],
  //     borderColor: [
  //       'rgba(255,99,132,1)',         //gennaio
  //       'rgba(54, 162, 235, 1)',      //febbraio
  //       'rgba(255, 206, 86, 1)',      //marzo
  //       'rgba(75, 192, 192, 1)',      //aprile
  //       'rgba(153, 102, 255, 1)',     //maggio
  //       'rgba(255, 159, 64, 1)' ,     //giugno
  //       'rgba(255,99,132,1)',         //luglio
  //       'rgba(54, 162, 235, 1)',      //agosto
  //       'rgba(255, 206, 86, 1)',      //settembre
  //       'rgba(75, 192, 192, 1)',      //ottobre
  //       'rgba(153, 102, 255, 1)',     //novembre
  //       'rgba(255, 159, 64, 1)'       //dicembre
  //     ],
  //     borderWidth: 2,
  //   }
  // ];

  // public chartOptions: any = {
  //   responsive: true
  // };
  // public chartClicked(e: any): void { }
  // public chartHovered(e: any): void { }


}
