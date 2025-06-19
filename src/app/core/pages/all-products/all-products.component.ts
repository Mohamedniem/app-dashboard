import { Component, inject, signal, DestroyRef, OnInit } from '@angular/core';
import { ContentTableAdminComponent } from '../../../shared/components/business/content-table-admin/content-table-admin.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products/products.service';
import { IProduct } from '../../interfaces/products/iproduct';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [ContentTableAdminComponent, FormsModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit{

  private readonly _productsService = inject(ProductsService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  searchValue = signal('');
  productList = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this._productsService.getProducts()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          if ('products' in res) {
            this.productList.set(res.products);
            console.log(this.productList());
            
          }
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
  }

  addProduct(): void {
    this._router.navigate(['maindashboard/products/add']);
  }

  deleteProduct(id: string): void {
    this._productsService.deleteProduct(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.getProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
  }

  updateProduct(id: string): void {
    this._router.navigate(['maindashboard/products/update', id]);
  }

}
