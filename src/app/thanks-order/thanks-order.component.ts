import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CartDetails } from '../cart/cart-details';
import { Maincart } from '../cart/maincart';
import { MemberOperationService } from '../member-operation.service';
import { UserserviceService } from '../userservice.service';
import { User } from '../user';
@Component({
  selector: 'app-thanks-order',
  templateUrl: './thanks-order.component.html',
  styleUrls: ['./thanks-order.component.css']
})
export class ThanksOrderComponent implements OnInit {
  order_id: number;
  ans: number;
  ansdic: number;
  userType: string;
  orderinfo: any[];
  orderDetailinfo: any[];
  arrcartItems: CartDetails[] = [];
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  gt;
  perDiscount: number;
  usercategory: boolean = false;
  constructor(private act_rout: ActivatedRoute, private memberSerObj: MemberOperationService, private _usersrc: UserserviceService, private rout: Router) {
    this.order_id = this.act_rout.snapshot.params['OrderID'];
    // console.log(order_id);
  }

  ngOnInit(): void {
    // if (localStorage.getItem('cart') != null) {
    this.arrcartItems = this.cart.CartItems;
    // console.log(this.arrcartItems);
    this.gt = localStorage.getItem('Finalamount');


    this._usersrc.getuserbyemailid(localStorage.getItem('u_EmailId')).subscribe(
      (dataUser: User[]) => {
        console.log(dataUser);
        this.userType = dataUser[0].u_Type;
        if (this.userType == 'member') {
          this.usercategory = true;
          // console.log(dataUser);
          this.memberSerObj.OffersDetails(localStorage.getItem('u_EmailId')).subscribe(
            (dataOfferDetails: any[]) => {
              let offer_Price = dataOfferDetails[0].offer_Price;
              // console.log(offer_Price);
              if (offer_Price == 600) {
                this.perDiscount = 8;
              }
              else {
                this.perDiscount = 12;
              }
              this.ans = this.cart.GrandTotal;
              this.ansdic = Math.round(this.ans * this.perDiscount / 100);
              // console.log(Math.round(this.ans - this.ansdic));


            }
          );
        }

      }
    );
    // }
  }

  continueshopping() {
    console.log(localStorage);
    localStorage.removeItem('cart');
    this.rout.navigate(['/products']);
  }
}
