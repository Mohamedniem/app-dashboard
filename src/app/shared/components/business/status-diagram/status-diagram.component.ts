import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts'
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OrderstatusService } from '../../../services/orderstatus.service';
import { Iorderstatus } from '../../../../core/interfaces/iorderstatus';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-status-diagram',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './status-diagram.component.html',
  styleUrl: './status-diagram.component.scss'
})
export class StatusDiagramComponent implements OnInit , OnDestroy{

  
constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

Orderstatus:Iorderstatus[]=[]
piechart: Chart | undefined;
getOrderDiagram !:Subscription

count(){
  
  
}



_OrderstatusService=inject(OrderstatusService)
isBrowser = false;
ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.count()
    this.getOrderstateDiagram()
  }


  getOrderstateDiagram(){
    this.getOrderDiagram=this._OrderstatusService.getOrderstatus().subscribe({
      next: (data) => {console.log(data.statistics);
      this.Orderstatus=data.statistics.ordersByStatus.filter((e:any) => e !== null)
     
      this.piechartm()
    },
    error :(err)=>{console.log(err)}
})
 


  }

  piechartm(){

     this.piechart = new Chart({
          chart : {type:'pie',plotShadow:false},
          credits:{enabled:false},
          plotOptions:{
              pie:{
                  innerSize:'55%',
                  borderRadius:0,
                  borderColor:'',
                  slicedOffset:0,
                  dataLabels:{
                      connectorWidth:0
                  }
              }
          },
          legend:{
              enabled:false
          },
           series:[{
          type :'pie',
          data :[
            {
              name: this.Orderstatus[0]._id, y:this.Orderstatus[0].count,color:'#00A85F'
            },
            {
              name: this.Orderstatus[1]._id,y:this.Orderstatus[1].count ,color:'#E93538'
            },
            {
              name: this.Orderstatus[2]._id,y:this.Orderstatus[2].count ,color:'#197FD2'
            },
            {
             name: this.Orderstatus[3]._id,y:this.Orderstatus[3].count ,color:'#F7F7F7'
            }
            ,
            {
             name: this.Orderstatus[4]._id,y:this.Orderstatus[4].count ,color:'#F82BA9'
            }
          ]
        }
          
        ]
      })
  }


  ngOnDestroy(): void {
    this.getOrderDiagram.unsubscribe()
  }

        

}
