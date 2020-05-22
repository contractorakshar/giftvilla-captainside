import { Component, OnInit } from '@angular/core';
import { CartDetails } from './cart-details';
import { CartoperationsService } from './cartoperations.service';
import { Maincart } from './maincart';
import { EmailToUserService } from '../loginpage/email-to-user.service';
declare var require: any;
const dateFormat = require('dateformat');
const now = new Date();

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  UserId: string = localStorage.getItem('u_EmailId');
  arrcartItems: CartDetails[] = [];
  productarr: string[] = [];
  quantityarr: number[] = [];
  GrandTotal: number = 0;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;

  constructor(private _cartService: CartoperationsService, private _mail: EmailToUserService) { }

  ngOnInit() {
    if (localStorage.getItem('cart') != null) {
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
    this.cart.CartItems[index] = item;
    this.cart.GrandTotal = this._cartService.doGrandTotal(this.cart.CartItems);
    this.GrandTotal = this.cart.GrandTotal;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  btnCheckout() {
    console.log(this.cart);
    let OrderID: number;
    let objOrder = {
      "fk_u_EmailId": this.cart.u_EmailId,
      "bill_date": dateFormat(now, "yyyy-mm-dd"),
      "order_amt": this.cart.GrandTotal,
      "order_payment": 'Cash',
      "order_spc_instruction": 'this is special instruction'
    };
    this._cartService.addOrder(objOrder).subscribe(
      (dataOrder: any) => {
        OrderID = dataOrder.insertId;
        console.log(dataOrder.insertId);
      },
      (err) => { },
      () => {
        let objOrderDetail = {
          'fk_order_id': OrderID,
          'cartItems': this.cart.CartItems
        };
        for (let i = 0; i < this.cart.CartItems.length; i++) {
          this.productarr.push(this.cart.CartItems[i].Product.pro_name);
          this.quantityarr.push(this.cart.CartItems[i].Quantuty);
        }
        this._cartService.addOrderDetail(objOrderDetail).subscribe(
          (y: any[]) => {
            console.log(y);
            alert("data added");
            this._mail.getUserByEmail(this.cart.u_EmailId).subscribe((data) => {
              this._mail.passwordMail(this.cart.u_EmailId, "BILL", this.cart.GrandTotal + "\n" + OrderID + "\n " + this.productarr + "\n" + this.quantityarr).subscribe(() => {
                console.log("mail sent");
              });
            });
          });
      }
    );
  }
}
