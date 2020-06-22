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
// import { SliderComponent } from './slider/slider.component';
import { SearchingComponent } from './searching/searching.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShippingDetailsComponent } from './checkout/shipping-details/shipping-details.component';
// import { PaymentComponent } from './payment/payment.component';

import { MemberCustomerComponent } from './member-customer/member-customer.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsComponent } from './terms/terms.component';
import { EdituserimageComponent } from './edituserimage/edituserimage.component';
// import { PaymentComponent } from './payment/payment.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { MenubarComponent } from './menubar/menubar.component';
import { OfferPageComponent } from './offer-page/offer-page.component';
import { SerachPageComponent } from './serach-page/serach-page.component';
import { LeftcategoryComponent } from './leftcategory/leftcategory.component';
import { WishesPageComponent } from './wishes-page/wishes-page.component';
import { PaymentComponent } from './payment/payment.component';



const arr: Routes = [
  { path: '', component: ProducthomeComponent, pathMatch: 'full' },
  { path: 'menu', component: MenubarComponent },
  { path: 'products', component: ProducthomeComponent },
  { path: 'menubar', component: LeftcategoryComponent },
  { path: 'productdrop/:cat_id', component: WatchComponent },
  { path: 'shoppingcart', component: CartComponent },
  { path: 'map', component: MaplocationComponent },
  { path: 'member', component: MemberCustomerComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'userinfo', component: UserinformationComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'sortedproductlist', component: SortedproductshowComponent },
  { path: 'viewMoreProduct/:pro_id', component: ViewMoreProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'SearchText/:txtSearch', component: SerachPageComponent },
  { path: 'help', component: HelppageComponent },
  { path: 'terms&condition', component: TermsComponent },
  { path: 'privacypolicy', component: PrivacypolicyComponent },
  { path: 'myorder', component: MyorderComponent },
  { path: 'passwordchange/:u_EmailId', component: PasswordchangeComponent },
  { path: 'searchingproducts/:cat_name', component: SearchingComponent },
  { path: 'help', component: HelppageComponent },
  { path: 'Wishes', component: WishesPageComponent },
  { path: 'editImage/:u_EmailId', component: EdituserimageComponent },
  { path: 'myorder', component: MyorderComponent },
  // { path: 'slider', component: SliderComponent },
  { path: 'shipping', component: ShippingDetailsComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  // { path: 'payment', component: PaymentComponent },
  { path: 'offers', component: OfferPageComponent },
  { path: '**', redirectTo: '/pagenotfound' }
];
export const routingArr = RouterModule.forRoot(arr);
