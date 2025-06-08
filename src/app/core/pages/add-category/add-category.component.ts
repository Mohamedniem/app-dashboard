import { Component } from '@angular/core';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [AdminInputComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

}
