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
            path: 'update/:categoryId',
            loadComponent: () =>
              import(
                './core/pages/update-category/update-category.component'
              ).then((c) => c.UpdateCategoryComponent),
          },
        ],
      },
      {
        path: 'Occasions',
        loadComponent: () =>
          import(
            './core/pages/occasions-admin/occasions-admin.component'
          ).then((c) => c.OccasionsAdminComponent),
      },
      {
        path: 'Products',
        loadComponent: () =>
          import(
            './shared/components/business/products-admin/products-admin.component'
          ).then((c) => c.ProductsAdminComponent),
      },
      {path:'**' ,
    loadComponent: () =>
      import('./shared/components/UI/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),}
    ],
    
  },
  
];
