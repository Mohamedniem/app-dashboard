import { Component, inject, Inject, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts'
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OrderstatusService } from '../../../services/orderstatus.service';
import { Iorderstatus } from '../../../../core/interfaces/iorderstatus';

@Component({
  selector: 'app-status-diagram',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './status-diagram.component.html',
  styleUrl: './status-diagram.component.scss'
})
export class StatusDiagramComponent implements OnInit{

  
constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

Orderstatus:Iorderstatus[]=[]
piechart: Chart | undefined;

count(){
  let x=this.Orderstatus.forEach(element =>element.count/element.count++)
  console.log(x);
  
}



_OrderstatusService=inject(OrderstatusService)
isBrowser = false;
ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.count()


this._OrderstatusService.getOrderstatus().subscribe({
  next: (data) => {console.log(data.statistics);
    this.Orderstatus=data.statistics.ordersByStatus
    this.piechartm()
  }
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

        

}
