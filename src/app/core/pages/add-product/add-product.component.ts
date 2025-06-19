import { ICategory } from './../../interfaces/category/icategory';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products/products.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { OccasionsService } from '../../services/occasions/occasions.service';
import { IOccasion } from '../../interfaces/occasion/ioccasion';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [AdminInputComponent, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _destroyRef = inject(DestroyRef);

  addProductForm!:FormGroup;

  categoryList!: ICategory[];
  occasionList!: IOccasion[];

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
    this.getOccasions();
  };

  getCategories(): void{
    this._categoriesService.getCategories().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        if ('categories' in res) {
          this.categoryList = res.categories
        }
      }
    })
  };
  getOccasions(): void{
    this._occasionsService.getOccasions().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        if ('occasions' in res) {
          this.occasionList = res.occasions
        }
      }
    })
  };

  onFileChange(file: any): void {
    if (file && file.type.startsWith('image/')) {
      this.addProductForm.patchValue({ image: file });
    };
  };

  createForm():void {
    this.addProductForm = this._formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      quantity: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      discount: [null, [Validators.minLength(3), Validators.maxLength(50)]],
      priceAfterDiscount: [null, [Validators.minLength(3), Validators.maxLength(50)]],
      category: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      occasion: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      imgCover: [null, [Validators.required]],
      images: [null, [Validators.required]]
    });
  };

  // Feature not working due to missing super admin credentials
  addProductSubmit(): void {
    if (this.addProductForm.invalid) return;

    const formData = new FormData();
    formData.append('title', this.addProductForm.get('title')?.value || '');
    formData.append('description', this.addProductForm.get('description')?.value || '');
    formData.append('quantity', this.addProductForm.get('quantity')?.value || '');
    formData.append('price', this.addProductForm.get('price')?.value || '');
    formData.append('discount', this.addProductForm.get('discount')?.value || '');
    formData.append('priceAfterDiscount', this.addProductForm.get('priceAfterDiscount')?.value || '');
    formData.append('category', this.addProductForm.get('category')?.value || '');
    formData.append('occasion', this.addProductForm.get('occasion')?.value || '');

    const coverImg = this.addProductForm.get('imgCover')?.value;
    const galleryImgs = this.addProductForm.get('images')?.value;

    if (coverImg) {
      formData.append('imgCover', coverImg);
    }

    if (galleryImgs && galleryImgs.length) {
      for (let i = 0; i < galleryImgs.length; i++) {
        formData.append('images', galleryImgs[i]);
      }
    }

    this._productsService.addProduct(formData).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe({
      next: (res) => {
        console.log('Product added successfully:', res);
        this.addProductForm.reset();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }
}
