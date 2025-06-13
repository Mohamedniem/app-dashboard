import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer-dashboard',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './footer-dashboard.component.html',
  styleUrl: './footer-dashboard.component.scss'
})
export class FooterDashboardComponent {

}
