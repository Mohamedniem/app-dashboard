import { CategoriesService } from './../../services/categories/categories.service';
import { FormsModule } from '@angular/forms';
// import { ContentTableAdminComponent } from './../../../shared/components/business/content-table-admin/content-table-admin.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ICategory } from '../../interfaces/category/icategory';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-categories-admin',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './categories-admin.component.html',
  styleUrl: './categories-admin.component.scss'
})
export class CategoriesAdminComponent implements OnInit {

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _router = inject(Router)

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

  addCategory():void {
    console.log('Adding new category');
    this._router.navigate(['/maindashboard/categories/add']);
  }

  deleteCategory(categoryId: string): void {
    console.log('Deleting category with ID:', categoryId);
    this._categoriesService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.getCategories();
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    })
  }

}
