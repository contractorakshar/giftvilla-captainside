import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GoogleMapsModule } from "@angular/google-maps";
import { CartComponent } from './cart/cart.component';

import { SliderModule } from 'angular-image-slider';


import { ProducthomeComponent } from './producthome/producthome.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routingArr } from './app.routing';
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
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsComponent } from './terms/terms.component';
import { EdituserimageComponent } from './edituserimage/edituserimage.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProducthomeComponent,
    LoginpageComponent,
    RegistrationFormComponent,
    MaplocationComponent,
    ViewMoreProductComponent,
    SortedproductshowComponent,
    WatchComponent,
    PagenotfoundComponent,
    UserinformationComponent,
    HelppageComponent,
    CategoryComponent,
    MyorderComponent,
    SliderComponent,
    WishlistComponent,
    PrivacypolicyComponent,
    TermsComponent,
    EdituserimageComponent,
  ],
  imports: [

    BrowserModule,
    SliderModule,
    routingArr,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    RouterModule.forRoot([]),

  ],
  providers: [],

  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
