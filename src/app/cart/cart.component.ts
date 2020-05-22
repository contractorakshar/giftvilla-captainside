import { Component, OnInit } from '@angular/core';
import { CartDetails } from './cart-details';
import { CartoperationsService } from './cartoperations.service';
import { Maincart } from './maincart';
import { EmailToUserService } from '../loginpage/email-to-user.service';
import { isNgTemplate } from '@angular/compiler';
import { Router } from '@angular/router';
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
  spcl_instruction: string;
  flag: Boolean = false;
  UserId: string = localStorage.getItem('u_EmailId');
  arrcartItems: CartDetails[] = [];
  productarr: string[] = [];
  quantityarr: number[] = [];
  GrandTotal: number = 0;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  constructor(private _cartService: CartoperationsService, private _mail: EmailToUserService, private _router: Router) { }

  ngOnInit() {
    // this.flag = true;
    //if (this.demo > this.ipq) {
    //console.log("sorrynot avilable");
    //alert('Reuested Order Quntity is not availabel');
    //this.flag = true;
    //}
    //this.flag = false
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
    console.log(item.Product.pro_qty);
    this.flag = false;
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
      //alert('Reuested Order Quntity is not availabel');
      this.flag = true;
    }
    // else {

    //   let productObject = {
    //   this.proQty: item.Product.pro_qty - abc,
    //     pro_id: item.Product.pro_id
    //   }

    // }
  }

  // navigateTodetails() {


  // }
  btnCheckout() {

    console.log(this.cart);
    if (this.UserId == null) {
      alert('Go to Login');
      console.log(this.UserId);
      this._router.navigate(['/loginpage']);
    }
    else {
      this.cart.u_EmailId = this.UserId;
      // if (this.proQty > this.ipq) {
      //   //console.log("sorrynot avilable");
      //   //alert('Reuested Order Quntity is not availabel');
      //   this.flag = true;
      // }

      let OrderID;
      let objOrder = {
        "fk_u_EmailId": this.cart.u_EmailId,
        "bill_date": dateFormat(now, "yyyy-mm-dd"),
        "order_amt": this.cart.GrandTotal,
        "order_payment": 'Cash',
        "order_spc_instruction": this.spcl_instruction,
      };
      console.log(this.spcl_instruction);


      this._cartService.addOrder(objOrder).subscribe(
        (dataOrder: any) => {
          console.log(objOrder);
          OrderID = dataOrder.insertId;
          console.log(dataOrder.insertId);
        },
        (err) => { },
        () => {
          let objOrderDetail = {
            'fk_order_id': OrderID,
            'cartItems': this.cart.CartItems
          };
          console.log(objOrderDetail);

          // let Bill = {
          //   od: OrderID,
          //   gt: this.cart.GrandTotal,
          //   //product_name: this.cart.CartItems[0].Product,
          //   //q: this.cart.CartItems[0].Quantuty,

          // }
          for (let i = 0; i < this.cart.CartItems.length; i++) {
            this.productarr.push(this.cart.CartItems[i].Product.pro_name);
            this.quantityarr.push(this.cart.CartItems[i].Quantuty);
          }
          this._cartService.addOrderDetail(objOrderDetail).subscribe(
            (y: any[]) => {
              console.log(y);
              alert("data added");
              this._mail.getUserByEmail(this.cart.u_EmailId).subscribe((data) => {


                this._mail.passwordMail(this.cart.u_EmailId, "BILL",
                  "\n----------------------------------------------------------------------------------------------" +
                  "\n OrderID " + OrderID +
                  "\n----------------------------------------------------------------------------------------------" +
                  "\nProducts Ordered  " + this.productarr +
                  "\n" +
                  "\nQuantity Ordered " + this.quantityarr +
                  "\n----------------------------------------------------------------------------------------------" +
                  "Total Amount:  " + this.cart.GrandTotal +
                  "\n----------------------------------------------------------------------------------------------" +
                  "Your Order is Received, Thanks for chosing us,Your Product will be deilverd -n 1-2 Days"
                ).subscribe(() => {
                  console.log("mail sent");

                });

              });
            });
        }
      );
      // let productObject = {
      //   pro_id:this.,
      //   pro_qty: this.proQty;

      // }
      // this._cartService.updateProductQuantity(productObject).subscribe(
      //   (x: any) => {
      //     console.log(x);
      //   }
      // );
    }
  }

}
