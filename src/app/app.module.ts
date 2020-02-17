import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GoogleMapsModule } from "@angular/google-maps";
import { CartComponent } from './cart/cart.component';
import { ProducthomeComponent } from './producthome/producthome.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routingArr } from './app.routing';
import { MaplocationComponent } from './maplocation/maplocation.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProducthomeComponent,
    MaplocationComponent,

  ],
  imports: [
    BrowserModule,
    routingArr,
    HttpClientModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    RouterModule.forRoot([]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
