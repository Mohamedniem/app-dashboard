import { Component, inject, signal } from '@angular/core';
import { ContentTableAdminComponent } from '../../../shared/components/business/content-table-admin/content-table-admin.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';
import { Router } from '@angular/router';
import { ICategory } from '../../interfaces/category/icategory';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [ContentTableAdminComponent, FormsModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss'
})
export class AllCategoriesComponent {

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _router = inject(Router);

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
  };

  addCategory():void {
    this._router.navigate(['maindashboard/categories/add']);
  };

  // Feature not working due to the unavailability of a super admin credentials
  deleteCategory(categoryId: string): void {
    this._categoriesService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.getCategories();
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    })
  };

  updateCategory(categoryId: string): void {
    console.log('Editing category with ID:', categoryId);
    
    this._router.navigate(['maindashboard/categories/update', categoryId]);
  };

}
