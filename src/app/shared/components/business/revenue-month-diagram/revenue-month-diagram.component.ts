import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts'
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OrderstatusService } from '../../../services/orderstatus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-revenue-month-diagram',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './revenue-month-diagram.component.html',
  styleUrl: './revenue-month-diagram.component.scss'
})
export class RevenueMonthDiagramComponent implements OnInit ,OnDestroy {


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  

  _Revenu=inject(OrderstatusService)
  Revenu:[]=[]
  lineChart: Chart | undefined;
  isBrowser = false;
  getOrderstat !:Subscription


  ngOnInit() {
      this.isBrowser = isPlatformBrowser(this.platformId);
      this.getOrderstatus()
    }


    getOrderstatus(){
      this.getOrderstat=this._Revenu.getOrderstatus().subscribe({
        next: (data) =>{console.log(data.statistics.monthlyRevenue);
          this.Revenu=data.statistics.monthlyRevenue.map((ele: any) => ele.revenue).reverse()
          this.createChart()
        }
        ,
        error: (err)=>{console.log(err)}
      })

    }




createChart(){

  this.lineChart = new Chart({
    chart:{type:"areaspline"},
    title: {text: "Revenue by Month"},
    xAxis:{
      categories: ["Jan", "Feb", "Mar", "Apr", "May"]
    },
    series:[
      {name:'',
        data: this.Revenu
      } as any
    ]
  })
}

ngOnDestroy(): void {
  this.getOrderstat.unsubscribe();
    
  }

}
