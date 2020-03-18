import { Routes, RouterModule } from '@angular/router';
import { ProducthomeComponent } from './producthome/producthome.component';
import { CartComponent } from './cart/cart.component';
import { MaplocationComponent } from './maplocation/maplocation.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ViewMoreProductComponent } from './view-more-product/view-more-product.component';
import { SortedproductshowComponent } from './sortedproductshow/sortedproductshow.component';
import { WatchComponent } from './watch/watch.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserinformationComponent } from './userinformation/userinformation.component';
import { HelppageComponent } from './helppage/helppage.component';
import { CategoryComponent } from './category/category.component';
import { MyorderComponent } from './myorder/myorder.component';
import { SliderComponent } from './slider/slider.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const arr: Routes = [
  { path: '', component: ProducthomeComponent, pathMatch: 'full' },
  { path: 'products', component: ProducthomeComponent },
  { path: 'productdrop/:cat_id', component: WatchComponent },
  { path: 'shoppingcart', component: CartComponent },
  { path: 'map', component: MaplocationComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'userinfo', component: UserinformationComponent },
  { path: 'registration', component: RegistrationFormComponent },
  {path : 'sortedproductlist' , component : SortedproductshowComponent },
  {path : 'viewMoreProduct/:pro_id' ,component : ViewMoreProductComponent},
  { path: 'category', component: CategoryComponent },
  { path: 'help', component: HelppageComponent },
  { path: 'myorder', component: MyorderComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'help', component: HelppageComponent },
  { path: 'myorder', component: MyorderComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: '**', redirectTo: '/pagenotfound' }
];
export const routingArr = RouterModule.forRoot(arr);
