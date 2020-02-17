import { Routes, RouterModule } from '@angular/router';
import { ProducthomeComponent } from './producthome/producthome.component';
import { CartComponent } from './cart/cart.component';
import { MaplocationComponent } from './maplocation/maplocation.component';

const arr: Routes = [
  { path: '', component: ProducthomeComponent, pathMatch: 'full' },
  { path: 'products', component: ProducthomeComponent },
  { path: 'shoppingcart', component: CartComponent },
  { path: 'map', component: MaplocationComponent },
  { path: '**', component: ProducthomeComponent }
];
export const routingArr = RouterModule.forRoot(arr);
