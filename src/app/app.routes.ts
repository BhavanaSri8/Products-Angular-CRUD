import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/components/product-list/product-list';
import { AddProductComponent } from './features/products/components/add-product/add-product';
import { EditProductComponent } from './features/products/components/edit-product/edit-product';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'add',
    component: AddProductComponent,
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
