import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../services/categories/categories.service';
import { ICategoryById } from '../../interfaces/category/icategory';
import { TitleCasePipe } from '@angular/common';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [TitleCasePipe, AdminInputComponent],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);

  categoryId!: string ;
  category!: ICategoryById;

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.getCategoryIdFromUrl();
    this.getCategoryFromBackend();
  }
  getCategoryIdFromUrl(): void {
    this._activatedRoute.paramMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((params) => {
      this.categoryId = params.get('categoryId') || '';
    });
  };
  getCategoryFromBackend(): void {
    this._categoriesService.getCategory(this.categoryId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        this.category = res.category;
      },
      error: (err) => {
        console.error('Error fetching category:', err);
      }
    });
  };

}
