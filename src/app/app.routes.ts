import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostComponent } from './pages/home/components/post/post.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: HomeComponent,
    data: { title: 'Bomberos UI' },
  }, // Agrega
];
