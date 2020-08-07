import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CartDetails } from '../cart/cart-details';
import { CartoperationsService } from '../cart/cartoperations.service';
import { Maincart } from '../cart/maincart';
import { EmailToUserService } from '../loginpage/email-to-user.service';

import { Router } from '@angular/router';
import { MemberOperationService } from '../member-operation.service';
import { UserserviceService } from '../userservice.service';
import { User } from '../user';

declare let paypal: any;
declare var require: any;
const dateFormat = require('dateformat');
const now = new Date();

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterViewInit {
  finalAmount: number;
  arrcartItems: CartDetails[] = [];
  productarr: string[] = [];
  spcl_instruction: string;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  quantityarr: number[] = [];
  GrandTotal: number = 0;
  UserId: string = localStorage.getItem('u_EmailId');

  @ViewChild("paypal") paypalele: ElementRef;

  constructor(private _cartService: CartoperationsService, private _mail: EmailToUserService, private _router: Router, private memberSerObj: MemberOperationService, private _usersrc: UserserviceService) { }
  ngOnInit() {
    // this.GrandTotal = this.GrandTotal;
    //     var x = "32";
    // var y: number = +x;
    let GT = localStorage.getItem('Finalamount');
    console.log(GT, localStorage.getItem('Finalamount'));
    this.GrandTotal = +GT;
  }
  product = {
    price: this.finalAmount,
    description: "demo",
    img: "assests/x.png",
  };
  padiFor = false;
  ngAfterViewInit(): void {
    console.log(this.finalAmount);
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  //currency_code: "USD",
                  value: this.finalAmount,
                },
              },
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            }
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.padiFor = true;
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypalele.nativeElement);
  }
  onCheckOutCash() {
    // btnCheckout() {
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
        "order_amt": this.GrandTotal,
        "order_payment": 'cash',
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
                  "Total Amount:  " + this.GrandTotal +
                  "\n----------------------------------------------------------------------------------------------" +
                  "Your Order is Received, Thanks for chosing us,Your Product will be deilverd in 1-2 Days"
                ).subscribe(() => {
                  console.log("mail sent");
                  localStorage.removeItem('cart');
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


