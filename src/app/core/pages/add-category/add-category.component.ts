import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [AdminInputComponent, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit{

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);

  addCategoryForm!:FormGroup;

  ngOnInit(): void {
    this.createForm();
  };

  onFileChange(file: any): void {
    if (file && file.type.startsWith('image/')) {
      this.addCategoryForm.patchValue({ image: file });
    };
  };

  createForm():void {
    this.addCategoryForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      image: [null, [Validators.required]]
    });
  };

  // Feature not working due to missing super admin credentials
  addCatSubmit(): void {
  const formData = new FormData();
  formData.append('name', this.addCategoryForm.get('name')?.value);
  formData.append('image', this.addCategoryForm.get('image')?.value);

  this._categoriesService.addCategory(formData).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
    next: (res) => {
      console.log('Category added successfully:', res);
      this.addCategoryForm.reset();
    },
    error: (error) => {
      console.error('Error adding category:', error);
    }
  });
}

}
