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
  
      const data = this.Orderstatus.filter(status => status._id !== 'null' &&  status._id !== 'pending' ).map((status, index) => {
          let color = '';

          // Example condition based on status._id
          if (status._id === 'completed') {
            color = '#00A85F'; // Green
          } else if (status._id === 'cancelled') {
            color = '#E93538'; // Red
          } else if (status._id === 'pending') {
            color = '#F82BA9'; // Blue
          } else if (status._id === 'inProgress') {
            color = '#197FD2'; // Default gray or fallback
          }

          return {
            name: '',
            y: parseFloat(((status.count / this.allcount) * 100).toFixed(0)),
            color: color
          };
        });

     this.piechart = new Chart({
          chart : {type:'pie',
            plotShadow:false,
          },
          credits:{enabled:false},
          plotOptions:{
              pie:{
                  innerSize:'55%',
                  borderRadius:0,
                  borderColor:'',
                  slicedOffset:0,
                  dataLabels:{
                        enabled: true, // Show data labels
                        format: '{point.y}%', // Show percentage permanently
                        style: {
                          fontSize: '14px',
                          color: '#000',
                        },
                        backgroundColor: '#ECEAF8', // Label background
                        borderRadius: 50,            // Rounded corners
                        padding: 5,                  // Space inside background
                        distance: -12,
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
          data:data
         
        }
          
        ]
      })
  }


  ngOnDestroy(): void {
    this.getOrderDiagram.unsubscribe()
  }

        

}
