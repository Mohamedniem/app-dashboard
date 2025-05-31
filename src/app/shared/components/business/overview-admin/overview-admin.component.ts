import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { StatusDiagramComponent } from "../status-diagram/status-diagram.component";
import { RevenueMonthDiagramComponent } from "../revenue-month-diagram/revenue-month-diagram.component";
import { OverallService } from '../../../services/overall.service';
import { isPlatformBrowser } from '@angular/common';
import { Ioverall } from '../../../../core/interfaces/ioverall';
import { AllCateogriesService } from '../../../services/all-cateogries.service';
import { IallCateogries } from '../../../../core/interfaces/iall-cateogries';
import { ScrollerModule } from 'primeng/scroller';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Itopselling } from '../../../../core/interfaces/itopselling';


@Component({
  selector: 'app-overview-admin',
  standalone: true,
  imports: [StatusDiagramComponent , RouterOutlet, RouterLink ,ScrollerModule],
  templateUrl: './overview-admin.component.html',
  styleUrl: './overview-admin.component.scss'
})
export class OverviewAdminComponent implements OnInit  {
  constructor (private _OverallService:OverallService ){
  }
   _PLATFORM_ID=inject(PLATFORM_ID)
   _AllCateogriesService=inject(AllCateogriesService)
   _ProductsService=inject(ProductsService)
  overallData:Ioverall[]=[]
  allCateogries:IallCateogries[]=[]
   items!: string[];
   topSellingProducts:Itopselling[]=[]





  ngOnInit(): void {
    if(isPlatformBrowser(this._PLATFORM_ID)){

      localStorage.setItem("token" , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjgyYjdiOGMxNDMzYTY2NmM4ZGU1ZTFiIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDc5NDIxODJ9.BbwcpYorvzNqmUmlZEDaZUqZMubgG52iq3J0HJquqCU')
      
    }

    this.items = Array.from({ length: this.allCateogries.length });

    this.getOverallData()
    this.AllCateogriesData()
    this.gettopselling()


  }







  getOverallData(){
    this._OverallService.getOverall().subscribe({
      next: (data) => {this.overallData.push(data.statistics)
        console.log(this.overallData)
      }
    })

  }

  AllCateogriesData(){
    this._AllCateogriesService.getAllCateogries().subscribe({
      next: (data) =>{this.allCateogries=data.statistics
        console.log(this.allCateogries);
      }
    })
    
  }

  gettopselling(){
    this._ProductsService.getproducts().subscribe({
      next: (pro) =>{console.log(pro.statistics.topSellingProducts)
        this.topSellingProducts=pro.statistics.topSellingProducts
      }
    })

  }




}
