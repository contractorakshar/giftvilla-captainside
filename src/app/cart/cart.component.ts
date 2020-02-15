import { Component, OnInit } from '@angular/core';
import { CartDetails } from './cart-details';
import { CartoperationsService } from './cartoperations.service';
import { Maincart } from './maincart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  UserId: string = '1';
  arrcartItems: CartDetails[] = [];
  GrandTotal: number = 0;
 cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  constructor(private _cartService: CartoperationsService) { }

  ngOnInit() {
    if (localStorage.getItem('cart') != null && this.UserId != null) {
    //  let cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
      if (this.cart.CartItems.length >= 0) {
        this.arrcartItems = this.cart.CartItems;
      }
      this.GrandTotal = this.cart.GrandTotal;
    }
  }
  onRemoveFromCart(SelectedProductID, index) {
    this.GrandTotal = this._cartService.onRemoveFromCart(SelectedProductID);
    this.arrcartItems.splice(index, 1);
  }
  onQtyChange(item: CartDetails, txtQty: string, index: number) {
    // console.log("selected item ", item);
    // console.log("latest value ", txtQty);
    // item.SubTotal = +txtQty * item.Product.pro_price;
    // let x: CartDetails[] = [item];
    // this.GrandTotal = this._cartService.doGrandTotal(x);
    // console.log(item);
    item.Quantuty = +txtQty;

    item.SubTotal = this._cartService.doSubTotal(item.Product.pro_price, item.Quantuty);
    this.cart.CartItems[index]=item;
    this.cart.GrandTotal=this._cartService.doGrandTotal(this.cart.CartItems);
    this.GrandTotal=this.cart.GrandTotal;
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }
}
