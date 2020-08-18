import { Component, OnInit } from '@angular/core';
import { CartDetails } from './cart-details';
import { CartoperationsService } from './cartoperations.service';
import { Maincart } from './maincart';
import { EmailToUserService } from '../loginpage/email-to-user.service';

import { Router } from '@angular/router';
import { MemberOperationService } from '../member-operation.service';
import { UserserviceService } from '../userservice.service';
import { User } from '../user';

declare var require: any;
const dateFormat = require('dateformat');
const now = new Date();

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  proQty;
  demo = this.proQty;
  ipq;
  pn: string;
  spcl_instruction: string;
  flag: Boolean = false;
  UserId: string = localStorage.getItem('u_EmailId');
  arrcartItems: CartDetails[] = [];
  memberOfferPrice: number;
  perDiscount: number;
  productarr: string[] = [];
  quantityarr: number[] = [];
  GrandTotal: number = 0;
  userType: string;
  divMember: boolean = false;
  customermember: boolean = false;
  ans: number;
  ansdic: number;
  Finalamount: number;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  constructor(private _cartService: CartoperationsService, private _mail: EmailToUserService, private _router: Router, private memberSerObj: MemberOperationService, private _usersrc: UserserviceService) { }
  OnAddDetails() {
    if (localStorage.getItem('u_EmailId') == null) {
      this._router.navigate(['/loginpage']);
    }
    else {
      localStorage.setItem('Finalamount', this.GrandTotal + "");
      // console.log(this.GrandTotal);
      this._router.navigate(['/shipping']);
    }

  }
  ngOnInit() {
    // this.flag = true;
    //if (this.demo > this.ipq) {
    //console.log("sorrynot avilable");

    //this.flag = true;
    //}
    //this.flag = false
    this.GrandTotal = this.cart.GrandTotal;
    if (localStorage.getItem('cart') != null) {
      //  let cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
      if (this.cart.CartItems.length >= 0) {
        this.arrcartItems = this.cart.CartItems;
      }
      this.GrandTotal = this.cart.GrandTotal;
    }
    if (localStorage.getItem('u_EmailId') != null) {

      this._usersrc.getuserbyemailid(localStorage.getItem('u_EmailId')).subscribe(
        (dataUser: User[]) => {
          console.log(dataUser);
          this.userType = dataUser[0].u_Type;
          if (this.userType == 'member') {
            console.log(dataUser);
            this.memberSerObj.OffersDetails(localStorage.getItem('u_EmailId')).subscribe(
              (dataOfferDetails: any[]) => {
                let offer_Price = dataOfferDetails[0].offer_Price;
                console.log(offer_Price);
                if (offer_Price == 600) {
                  this.perDiscount = 8;
                }
                else {
                  this.perDiscount = 12;
                }
                this.ans = this.cart.GrandTotal;
                this.ansdic = this.ans * this.perDiscount / 100;
                console.log(Math.round(this.ans - this.ansdic));
                this.GrandTotal = Math.round(this.ans - this.ansdic);
                this.divMember = true;
              }
            );
          }
          if (this.userType != 'member') {
            this.GrandTotal += 40;
            this.customermember = true;
          }
        }
      );

    }
  }

  onRemoveFromCart(SelectedProductID, index) {
    this.GrandTotal = this._cartService.onRemoveFromCart(SelectedProductID);
    this.arrcartItems.splice(index, 1);
  }

  onQtyChange(item: CartDetails, txtQty: string, index: number) {
    // console.log("selected item ", item);
    console.log("latest value ", txtQty);
    // item.SubTotal = +txtQty * item.Product.pro_price;
    // let x: CartDetails[] = [item];
    // this.GrandTotal = this._cartService.doGrandTotal(x);
    console.log(item.Product.pro_qty);

    item.Quantuty = +txtQty;

    item.SubTotal = this._cartService.doSubTotal(item.Product.pro_price, item.Quantuty);
    this.cart.CartItems[index] = item;
    this.cart.GrandTotal = this._cartService.doGrandTotal(this.cart.CartItems);
    this.GrandTotal = this.cart.GrandTotal;

    localStorage.setItem('cart', JSON.stringify(this.cart));
    let abc = parseInt(txtQty);
    this.ipq = item.Product.pro_qty;
    this.proQty = parseInt(txtQty);
    if (abc > item.Product.pro_qty) {

      //console.log("sorrynot avilable");

      this.flag = true;
      this.pn = item.Product.pro_name;
      localStorage.setItem('Finalamount', this.GrandTotal + "");


    }

  }
}
