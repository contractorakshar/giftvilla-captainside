import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';
import { Router } from '@angular/router';
import { CartoperationsService } from '../cart/cartoperations.service';
import { Maincart } from '../cart/maincart';
import { ProductServiceService } from '../product-service.service';
import { CartDetails } from '../cart/cart-details';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  arrcartItems: CartDetails[] = [];
  category: productdisplay[] = [];
  arrwatch: productdisplay[] = [];
  SearchText: productdisplay[] = [];
  GrandTotal: number = 0;
  seacrhArray: productdisplay[] = [];
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  constructor(public router: Router, private _cartService: CartoperationsService, private _productData: ProductServiceService, private _router: Router) { }

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

  SearchTextBox(txtSearch) {
    console.log(txtSearch);
    if (txtSearch != null) {
      this._router.navigate(['/SearchText', txtSearch]);
    }
  }
  SearchTextBox1(txtSearch) {
    location.reload();
    console.log(txtSearch);
    if (txtSearch != null) {
      this._router.navigate(['/SearchText', txtSearch]);
    }
  }
  onLogout() {
    // localStorage.clear();
    localStorage.removeItem('u_EmailId');
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
