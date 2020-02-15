import { Routes, RouterModule } from '@angular/router';
import { ProducthomeComponent } from './producthome/producthome.component';
import { CartComponent } from './cart/cart.component';


const arr: Routes = [
  { path: '', component: ProducthomeComponent, pathMatch: 'full' },
  { path: 'products', component: ProducthomeComponent },
  { path: 'shoppingcart', component: CartComponent },
  { path: '**', component: ProducthomeComponent }
];
export const routingArr=RouterModule.forRoot(arr);
