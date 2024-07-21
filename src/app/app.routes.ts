import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CompaniesComponent } from './pages/companies/companies/companies.component';
import { DirectoryComponent } from './pages/companies/company/directory/directory.component';
import { CompanyComponent } from './pages/companies/company/company.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: HomeComponent,
    data: { title: 'Bomberos UI' },
  },
  {
    path: 'companies',
    children: [
      {
        path: '',
        component: CompaniesComponent,
      },
      {
        path: 'directorio-general',
        component: DirectoryComponent,
        data: { title: 'Directorio' },
      },
      {
        path: ':nombre-company',
        component: CompanyComponent,
        data: { title: 'Compañía' },
      },
    ],
  }, // Agrega
];
