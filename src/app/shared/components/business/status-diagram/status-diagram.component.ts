import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts'
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, PercentPipe } from '@angular/common';
import { OrderstatusService } from '../../../services/orderstatus.service';
import { Iorderstatus } from '../../../../core/interfaces/iorderstatus';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-status-diagram',
  standalone: true,
  imports: [ChartModule , PercentPipe ],
  templateUrl: './status-diagram.component.html',
  styleUrl: './status-diagram.component.scss'
})
export class StatusDiagramComponent implements OnInit , OnDestroy{

  
constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

Orderstatus:Iorderstatus[]=[]
piechart: Chart | undefined;
getOrderDiagram !:Subscription
diagramCounts:[]=[]
diagramShape:[]=[]
allcount: any;



_OrderstatusService=inject(OrderstatusService)
isBrowser = false;
ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    this.getOrderstateDiagram()
  }





  getOrderstateDiagram(){
    this.getOrderDiagram=this._OrderstatusService.getOrderstatus().subscribe({
      next: (data) => {console.log(data.statistics);
      this.Orderstatus=data.statistics.ordersByStatus.filter((e:any) => e !== null)
      this.diagramShape=data.statistics.ordersByStatus.filter((e:any) => e._id !== null)
      
      console.log(this.Orderstatus);
      this.count()

      
     
      this.piechartm()
    },
    error :(err)=>{console.log(err)}
})
 


  }

    count(){
    this.allcount= this.diagramShape.map((e:any) => e.count).reduce((prev:any,next:any)=>prev+next)
    
      console.log(this.allcount);

  
}

  piechartm(){
    const data = this.Orderstatus.map((status, index) => {
    const colors = ['#00A85F', '#E93538', '#197FD2', '#F7F7F7', '#F82BA9'];
    return {
      name: status._id,
      y: parseFloat(((status.count / this.allcount) * 100).toFixed(0)),
      color: colors[index % colors.length]
    };
  });

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
          tooltip:{
            formatter(){
              return `${this.y}%`
            }
          },
           title :{
            text:'Orders Status',
            style:{
              fontSize:"24px"
            }
           },
           series:[{
          type :'pie',
          // data:['jan','kik','tit','pop'],
          // zones:
          data:data
         
          // data :[
          //   {
          //     name: this.Orderstatus[0]._id, y:this.Orderstatus[0].count/this.allcount*100 ,color:'#00A85F'
          //   },
          //   {
          //     name: this.Orderstatus[1]._id,y:this.Orderstatus[1].count/this.allcount*100 ,color:'#E93538'
          //   },
          //   {
          //     name: this.Orderstatus[2]._id,y:this.Orderstatus[2].count/this.allcount*100 ,color:'#197FD2'
          //   },
          //   {
          //    name: this.Orderstatus[3]._id,y:this.Orderstatus[3].count/this.allcount*100 ,color:'#F7F7F7'
          //   }
          //   ,
          //   {
          //    name: this.Orderstatus[4]._id,y:this.Orderstatus[4].count/this.allcount*100 ,color:'#F82BA9'
          //   }
          // ]
        }
          
        ]
      })
  }


  ngOnDestroy(): void {
    this.getOrderDiagram.unsubscribe()
  }

        

}
