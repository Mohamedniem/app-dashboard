import {
  Component,
  inject,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

import { FlowbiteService } from './core/services/flowbite.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { initFlowbite } from 'flowbite';
import { MainDashboardComponent } from "./core/pages/main-dashboard/main-dashboard.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    MainDashboardComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'rose';
  isLogedIn!: boolean;

  
  private readonly _flowbiteService = inject(FlowbiteService);
  constructor() {
    
  }

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {});
  }
}
