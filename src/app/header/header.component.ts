import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Maincart } from '../cart/maincart';
import { CartoperationsService } from '../cart/cartoperations.service';
import { CartDetails } from '../cart/cart-details';
import { ProductServiceService } from '../product-service.service';
import { productdisplay } from '../productdisplay'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  arrcartItems: CartDetails[] = [];
  category: productdisplay[] = [];
  arrwatch: productdisplay[] = [];
  GrandTotal: number = 0;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  constructor(public router: Router, private _cartService: CartoperationsService, private _productData: ProductServiceService) { }

  ngOnInit() {
    // this.arrcartItems = this.cart.CartItems;
    // this.GrandTotal = this.cart.GrandTotal;
    this._productData.getAllCategory().subscribe(
      (data: productdisplay[]) => {
        this.category = data;
        // console.log(data);
        //console.log(data);
      });
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  onWatchClick(cat_id) {
    console.log(cat_id);
    this.router.navigate(['/productdrop', cat_id]);
    // this._productData.getproductBycategory(cat_id).subscribe(
    //   (data: productdisplay[]) => {
    //     console.log(data);
    //     // this.category = data;
    //     console.log('change');
    //   }
    // );
  }
}
