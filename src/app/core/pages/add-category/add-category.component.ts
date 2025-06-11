import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [AdminInputComponent, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit{

  private readonly _formBuilder = inject(FormBuilder);

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
  addCatSubmit(): void {
    console.log(this.addCategoryForm.value);
    
  };
}
