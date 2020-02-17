import { Routes, RouterModule } from '@angular/router';
import { ProducthomeComponent } from './producthome/producthome.component';
import { CartComponent } from './cart/cart.component';
import { MaplocationComponent } from './maplocation/maplocation.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';


const arr: Routes = [
  { path: '', component: ProducthomeComponent, pathMatch: 'full' },
  { path: 'products', component: ProducthomeComponent },
  { path: 'shoppingcart', component: CartComponent },
  { path: 'map', component: MaplocationComponent },
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: '**', component: ProducthomeComponent }
];
export const routingArr = RouterModule.forRoot(arr);
