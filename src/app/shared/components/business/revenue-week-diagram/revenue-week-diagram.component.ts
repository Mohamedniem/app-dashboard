import { Component, inject, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderstatusService } from '../../../services/orderstatus.service';
import { Chart, ChartModule } from 'angular-highcharts';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-revenue-week-diagram',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './revenue-week-diagram.component.html',
  styleUrl: './revenue-week-diagram.component.scss'
})
export class RevenueWeekDiagramComponent implements OnInit , OnDestroy {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  
    _Revenu=inject(OrderstatusService)
    Revenu:[]=[]
    dayRevenu:[]=[]
    lineChart: Chart | undefined;
    weekrevenu ! :Subscription
  
    isBrowser = false;
    ngOnInit() {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.getweekrevenu()
        
  
      }

      getweekrevenu(){
        this.weekrevenu=this._Revenu.getOrderstatus().subscribe({
          next: (data) =>{console.log(data.statistics.dailyRevenue);
            this.Revenu=data.statistics.dailyRevenue.map((ele: any) => ele.revenue).reverse()
            this.dayRevenu=data.statistics.dailyRevenue.map((ele: any) => ele._id)
            this.createChart()
          },
          error: (err)=>{console.log(err)}
        })

      }
  
  createChart(){
  
    this.lineChart = new Chart({
      chart:{type:"areaspline"},
      credits:{
        text:'',
        href:''
      },
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

  ngOnDestroy(): void {
    this.weekrevenu.unsubscribe()
  }



}
