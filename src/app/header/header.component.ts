import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Maincart } from '../cart/maincart';

import { CartoperationsService } from '../cart/cartoperations.service';
import { CartDetails } from '../cart/cart-details';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
arrcartItems:CartDetails[]=[];
GrandTotal: number = 0;
cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  constructor(public router:Router,private _cartService: CartoperationsService) { }

  ngOnInit() {
this.arrcartItems=this.cart.CartItems;
this.GrandTotal=this.cart.GrandTotal;
  }


}
