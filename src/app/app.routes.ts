import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'maindashboard', pathMatch: 'full' },
  {
          path: 'maindashboard',
          loadComponent: () =>
            import('./core/pages/main-dashboard/main-dashboard.component').then(
              (c) => c.MainDashboardComponent
            ),children:[
              {
                path: 'overview',
                loadComponent: () =>
                  import('./shared/components/business/overview-admin/overview-admin.component').then(
                    (c) => c.OverviewAdminComponent
                  ),
              },
              {
                path: 'Categories',
                loadComponent: () =>
                  import('./shared/components/business/categories-admin/categories-admin.component').then(
                    (c) => c.CategoriesAdminComponent
                  ),
              },
              {
                path: 'Occasions',
                loadComponent: () =>
                  import('./shared/components/business/occasions-admin/occasions-admin.component').then(
                    (c) => c.OccasionsAdminComponent
                  ),
              },
              {
                path: 'Products',
                loadComponent: () =>
                  import('./shared/components/business/products-admin/products-admin.component').then(
                    (c) => c.ProductsAdminComponent
                  ),
              },

            ]
  },
  

];
