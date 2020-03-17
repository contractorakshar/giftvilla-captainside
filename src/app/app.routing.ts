import { Routes, RouterModule } from '@angular/router';
import { ProducthomeComponent } from './producthome/producthome.component';
import { CartComponent } from './cart/cart.component';
import { MaplocationComponent } from './maplocation/maplocation.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ViewMoreProductComponent } from './view-more-product/view-more-product.component';
import { SortedproductshowComponent } from './sortedproductshow/sortedproductshow.component';



const arr: Routes = [
  { path: '', component: ProducthomeComponent, pathMatch: 'full' },
  { path: 'products', component: ProducthomeComponent },
  { path: 'shoppingcart', component: CartComponent },
  { path: 'map', component: MaplocationComponent },
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'registration', component: RegistrationFormComponent },
  {path : 'sortedproductlist' , component : SortedproductshowComponent },
  {path :'viewMoreProduct/:pro_id' ,component : ViewMoreProductComponent},
  { path: '**', component: ProducthomeComponent }
];
export const routingArr = RouterModule.forRoot(arr);
