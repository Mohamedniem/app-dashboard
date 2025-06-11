import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';

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
    console.log(this.addCategoryForm.value);
    this._categoriesService.addCategory(this.addCategoryForm.value).subscribe({
      next: (response) => {
        console.log('Category added successfully:', response);
        this.addCategoryForm.reset();
      },
      error: (error) => {
        console.error('Error adding category:', error);
      }
    });
  };
}
