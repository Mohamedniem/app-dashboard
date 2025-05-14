import { Component } from '@angular/core';
import { NavbarDashboardComponent } from "../../../shared/components/business/navbar-dashboard/navbar-dashboard.component";
import { SidebarComponent } from "../../../shared/components/business/sidebar/sidebar.component";
import { FooterDashboardComponent } from "../../../shared/components/business/footer-dashboard/footer-dashboard.component";
import { OverviewAdminComponent } from "../../../shared/components/business/overview-admin/overview-admin.component";

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [NavbarDashboardComponent, SidebarComponent, FooterDashboardComponent, OverviewAdminComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent {

}
