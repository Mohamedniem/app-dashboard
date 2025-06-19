import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../services/categories/categories.service';
import { ICategory } from '../../interfaces/category/icategory';
import { TitleCasePipe } from '@angular/common';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModalComponent } from "../../../shared/components/business/image-modal/image-modal.component";

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [TitleCasePipe, AdminInputComponent, ReactiveFormsModule, FormsModule, ImageModalComponent],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);

  categoryId!: string ;
  category!: ICategory;

  isModalOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.getCategoryIdFromUrl();
    this.getCategoryFromBackend();
  }
  getCategoryIdFromUrl(): void {
    this._activatedRoute.paramMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((params) => {
      this.categoryId = params.get('id') || '';
    });
  };
  getCategoryFromBackend(): void {
    this._categoriesService.getCategory(this.categoryId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        if ('category' in res) {
          this.category = res.category;
        }
      },
      error: (err) => {
        console.error('Error fetching category:', err);
      }
    });
  };
  // Feature not working due to missing super admin credentials
  updateCategory(event: any): void {
  const formData = new FormData();
  formData.append('name', event.target.value);
  formData.append('image', this.category.image);
  this._categoriesService.updateCategory(this.categoryId, formData)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: () => {
        this.getCategoryFromBackend();
      },
      error: (err) => {
        console.error('Error updating category:', err);
      }
    });
}


  openModal(): void {
    this.isModalOpen.set(true);
  };
  closeModal(): void {
    this.isModalOpen.set(false);
  };

}
