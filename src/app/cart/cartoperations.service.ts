import { Injectable } from '@angular/core';
import { Maincart } from './maincart';
import { CartDetails } from './cart-details';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartoperationsService {

  urlOrder: string = 'http://localhost:3000/order/';

  urlOrderDetail: string = 'http://localhost:3000/orderdetails/';

  constructor(private _http: HttpClient) { }
  onRemoveFromCart(SelectedProductID): number {
    if (localStorage.getItem('cart') != null) {
      let cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
      let index: number = -1;
      if (cart.CartItems.length >= 0) {
        index = cart.CartItems.map(function (x) {
          return x.Product.pro_id;
        }).indexOf(SelectedProductID);
        if (index != -1) {
          cart.CartItems.splice(index, 1);
          cart.GrandTotal = this.doGrandTotal(cart.CartItems);
          localStorage.setItem('cart', JSON.stringify(cart));
          return cart.GrandTotal;
        }
      }
    }
    return 0;
  }

  doSubTotal(Price, Quantity): number {
    return Price * Quantity;
  }

  doGrandTotal(CartItems: CartDetails[]): number {
    let GrandTotal: number = 0;
    if (CartItems != null) {
      if (CartItems.length >= 0) {
        for (let i = 0; i < CartItems.length; i++) {
          GrandTotal += CartItems[i].SubTotal;
        }
      }
    }
    return GrandTotal;
  }

  addOrder(item) {
    const body = JSON.stringify(item);
    const head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(body);
    return this._http.post(this.urlOrder, body, { headers: head });
  }

  addOrderDetail(item) {
    const body = JSON.stringify(item);
    const head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(body);
    return this._http.post(this.urlOrderDetail, body, { headers: head });
  }
}
