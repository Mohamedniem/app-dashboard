import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { OrderstatusService } from '../../../services/orderstatus.service';
import { Chart, ChartModule } from 'angular-highcharts';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-revenue-week-diagram',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './revenue-week-diagram.component.html',
  styleUrl: './revenue-week-diagram.component.scss'
})
export class RevenueWeekDiagramComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
    _Revenu=inject(OrderstatusService)
    Revenu:[]=[]
    dayRevenu:[]=[]
    lineChart: Chart | undefined;
  
    isBrowser = false;
    ngOnInit() {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this._Revenu.getOrderstatus().subscribe({
          next: (data) =>{console.log(data.statistics.dailyRevenue);
            this.Revenu=data.statistics.dailyRevenue.map((ele: any) => ele.revenue).reverse()
            this.dayRevenu=data.statistics.dailyRevenue.map((ele: any) => ele.revenue)
            this.createChart()
  
            
          }
        })
  
      }
  
  createChart(){
  
    this.lineChart = new Chart({
      chart:{type:"areaspline"},
      title: {text: "Revenue by Month"},
      xAxis:{
        categories: this.dayRevenu
      },
      series:[
        {name:'',
          data: this.Revenu
        } as any
      ]
    })
  }

}
