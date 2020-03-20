import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';
import { ProductServiceService } from '../product-service.service';
import { CartDetails } from '../cart/cart-details';
import { Router } from '@angular/router';
import { CartoperationsService } from '../cart/cartoperations.service';
import { Maincart } from '../cart/maincart';

@Component({
  selector: 'app-producthome',
  templateUrl: './producthome.component.html',
  styleUrls: ['./producthome.component.css']
})
export class ProducthomeComponent implements OnInit {
  arr: productdisplay[] = [];
  cartProductItem: productdisplay = null;
  currentCartItem: CartDetails = null;
  SubTotal = 0;
  GrandTotal = 0;
  UserId: string = localStorage.getItem('u_EmailId');
  constructor(private _productData: ProductServiceService, private _cartService: CartoperationsService, private _router: Router) { }

  ngOnInit() {
    this._productData.getAllProducts().subscribe((data: productdisplay[]) => {
      this.arr = data;
    });
  }
  onAddToCart(item: productdisplay) {

    console.log(item);
    if (this.UserId == null) {
      alert('Go to Login');
      //console.log(this.UserId);
      this._router.navigate(['/loginpage']);
    }
    else {
      this.cartProductItem = item;
      this.SubTotal = this._cartService.doSubTotal(this.cartProductItem.pro_price, 1);
      this.currentCartItem = new CartDetails(this.cartProductItem, 1, this.SubTotal);
      if (localStorage.getItem('cart') == null) {
        const cartItems: CartDetails[] = [];
        cartItems.push(this.currentCartItem);
        this.GrandTotal = this._cartService.doGrandTotal(cartItems);
        const myCart = new Maincart(cartItems, this.GrandTotal, this.UserId);
        localStorage.setItem('cart', JSON.stringify(myCart));
      }
      else {
        const cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
        let index: number = -1;
        if (cart.CartItems.length >= 0) {
          index = cart.CartItems.map(function (x) {
            return x.Product.pro_id;
          }).indexOf(item.pro_id);
        }
        if (index == -1) {
          cart.CartItems.push(this.currentCartItem);
          cart.GrandTotal = this._cartService.doGrandTotal(cart.CartItems);
          cart.u_EmailId = this.UserId;
          localStorage.setItem('cart', JSON.stringify(cart));

        }
        else {
          const cartItem: CartDetails = cart.CartItems[index];
          cartItem.Quantuty += 1;
          cartItem.SubTotal = this._cartService.doSubTotal(this.cartProductItem.pro_price, cartItem.Quantuty);
          cart.CartItems[index] = cartItem;

          cart.GrandTotal = this._cartService.doGrandTotal(cart.CartItems);
          cart.u_EmailId = this.UserId;

          localStorage.setItem('cart', JSON.stringify(cart));
        }


      }
    }
    //alert(item.pro_name + " added");
  }
  onRemoveFromCart(SelectedProductID) {
    if (this.UserId != null) {
      this._cartService.onRemoveFromCart(SelectedProductID);
      //this._router.navigate['/cart']);
    }
  }

}
