import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';

import { Router, ActivatedRoute } from '@angular/router';
import { orders } from '../order_bill';
import { WishlistsService } from '../wishlists.service';
import { WishlistOperationsService } from '../wishlist-operations.service';
import { Maincart } from '../cart/maincart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartDetails } from '../cart/cart-details';
import { CartoperationsService } from '../cart/cartoperations.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {


  pro_id: number;
  u_EmailId: string;
  fk_u_EmailId: string;
  wishlistarr: any[] = [];
  cartProductItem: productdisplay = null;
  currentCartItem: CartDetails = null;
  SubTotal = 0;
  GrandTotal = 0;
  UserId: string = localStorage.getItem('u_EmailId');
  constructor(private _wishser: WishlistsService, private _rou: Router, private _actrou: ActivatedRoute, private wishlistService: WishlistOperationsService, private _cartService: CartoperationsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.u_EmailId = localStorage.getItem('u_EmailId');
    // this.u_EmailId = this._actrou.snapshot.params['u_EmailId'];
    console.log(this.u_EmailId);
    this.wishlistService.getAllwishlistItems(this.u_EmailId).subscribe(
      (dataWishlist: any[]) => {
        this.wishlistarr = dataWishlist;
        console.log(this.wishlistarr);
      }
    );

  }
  onRemoveFromWishlist(fk_pro_id, index) {
    console.log(fk_pro_id);
    this.wishlistService.removeFromWishlist(fk_pro_id).subscribe(
      (dataRemoved: any[]) => {
        this.wishlistarr.splice(index, 1);
      }
    );
  }
  onAddToCart(item: productdisplay) {
    console.log(item);
    // if (this.UserId == null) {

    //   console.log(this.UserId);
    //   this._router.navigate(['/loginpage']);
    // }
    // else {
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
        // cart.u_EmailId = this.UserId;
        localStorage.setItem('cart', JSON.stringify(cart));

      }
      else {
        const cartItem: CartDetails = cart.CartItems[index];
        cartItem.Quantuty += 1;
        cartItem.SubTotal = this._cartService.doSubTotal(this.cartProductItem.pro_price, cartItem.Quantuty);
        cart.CartItems[index] = cartItem;

        cart.GrandTotal = this._cartService.doGrandTotal(cart.CartItems);
        // cart.u_EmailId = this.UserId;

        localStorage.setItem('cart', JSON.stringify(cart));
      }


    }
    console.log(localStorage.getItem('cart'));

    this._snackBar.open(this.cartProductItem.pro_name + 'Added to cart', 'Close', {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });

  }
}
