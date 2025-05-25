import { CategoriesService } from './../../services/categories/categories.service';
import { FormsModule } from '@angular/forms';
import { SearchBarAdminComponent } from './../../../shared/components/business/search-bar-admin/search-bar-admin.component';
import { ContentTableAdminComponent } from './../../../shared/components/business/content-table-admin/content-table-admin.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ICategory } from '../../interfaces/category/icategory';

@Component({
  selector: 'app-categories-admin',
  standalone: true,
  imports: [ContentTableAdminComponent, FormsModule],
  templateUrl: './categories-admin.component.html',
  styleUrl: './categories-admin.component.scss'
})
export class CategoriesAdminComponent implements OnInit {

  private readonly _categoriesService = inject(CategoriesService);

  searchValue = signal('');

  categoryList = signal<ICategory[]>([]);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        if (res?.statistics) {
          this.categoryList.set(res.statistics);
        }
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  deleteCategory(id: string):void {
    
  }

}
