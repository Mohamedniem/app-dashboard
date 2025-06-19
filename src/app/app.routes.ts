import { AllProductsComponent } from './core/pages/all-products/all-products.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  
  { path: '', redirectTo: 'maindashboard', pathMatch: 'full' },
  {
    path: 'maindashboard',
    loadComponent: () =>
      import('./core/pages/main-dashboard/main-dashboard.component').then(
        (c) => c.MainDashboardComponent
      ),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () =>
          import(
            './shared/components/business/overview-admin/overview-admin.component'
          ).then((c) => c.OverviewAdminComponent),
        children: [
          { path: '', redirectTo: 'monthly', pathMatch: 'full' },
          {
            path: 'monthly',
            loadComponent: () =>
              import(
                './shared/components/business/revenue-month-diagram/revenue-month-diagram.component'
              ).then((c) => c.RevenueMonthDiagramComponent),
          },
          {
            path: 'weekly',
            loadComponent: () =>
              import(
                './shared/components/business/revenue-week-diagram/revenue-week-diagram.component'
              ).then((c) => c.RevenueWeekDiagramComponent),
          },
        ],
      },
      {
        path: 'categories',
        loadComponent: () =>
          import(
            './core/pages/categories-admin/categories-admin.component'
          ).then((c) => c.CategoriesAdminComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './core/pages/all-categories/all-categories.component'
              ).then((c) => c.AllCategoriesComponent),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./core/pages/add-category/add-category.component').then(
                (c) => c.AddCategoryComponent
              ),
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './core/pages/update-category/update-category.component'
              ).then((c) => c.UpdateCategoryComponent),
          },
        ],
      },
      {
        path: 'occasions',
        loadComponent: () =>
          import(
            './core/pages/occasions-admin/occasions-admin.component'
          ).then((c) => c.OccasionsAdminComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './core/pages/all-occasions/all-occasions.component'
              ).then((c) => c.AllOccasionsComponent),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./core/pages/add-occasion/add-occasion.component').then(
                (c) => c.AddOccasionComponent
              ),
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './core/pages/update-occasion/update-occasion.component'
              ).then((c) => c.UpdateOccasionComponent),
          },
        ],
      },
      {
        path: 'products',
        loadComponent: () =>
          import(
            './shared/components/business/products-admin/products-admin.component'
          ).then((c) => c.ProductsAdminComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './core/pages/all-products/all-products.component'
              ).then((c) => c.AllProductsComponent),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./core/pages/add-product/add-product.component').then(
                (c) => c.AddProductComponent
              ),
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import(
                './core/pages/update-product/update-product.component'
              ).then((c) => c.UpdateProductComponent),
          }
        ]
      },
      {path:'**' ,
    loadComponent: () =>
      import('./shared/components/UI/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),}
    ],
    
  },
  
];
