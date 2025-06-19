import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products/products.service';
import { TitleCasePipe } from '@angular/common';
import { AdminInputComponent } from "../../../shared/components/business/admin-input/admin-input.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModalComponent } from "../../../shared/components/business/image-modal/image-modal.component";
import { IProduct } from '../../interfaces/products/iproduct';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [TitleCasePipe, AdminInputComponent, ReactiveFormsModule, FormsModule, ImageModalComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);
  private readonly _destroyRef = inject(DestroyRef);

  productId!: string ;
  product!: IProduct;

  isModalOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.getProductIdFromUrl();
    this.getProductFromBackend();
  }
  getProductIdFromUrl(): void {
    this._activatedRoute.paramMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((params) => {
      this.productId = params.get('id') || '';
    });
  };
  getProductFromBackend(): void {
    this._productsService.getProduct(this.productId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        if ('product' in res) {
          this.product = res.product;
        }
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  };
  // Feature not working due to missing super admin credentials
  updateProduct(event: any): void {
    const formData = new FormData();
    formData.append('name', event.target.value);
    formData.append('image', this.product.images[0]);
    this._productsService.updateProduct(this.productId, formData)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.getProductFromBackend();
        },
        error: (err) => {
          console.error('Error updating product:', err);
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
