import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Maincart } from '../cart/maincart';
import { CartoperationsService } from '../cart/cartoperations.service';
import { orders } from '../order_bill';
declare let paypal: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  finalAmount: number = 1;
  order_obj: orders[] = [];
  // pay: Maincart = {
  //   GrandTotal: this.cartop.doGrandTotal(this.product, this.qty),

  // };
  @ViewChild("paypal") paypalele: ElementRef;

  product_ordered = {
    price: this.cart.GrandTotal,
    description: this.order_obj[0].order_spc_instruction,

    //"order_spc_instruction": 'this is special instruction'
    //demo:    // price: this.finalAmount,
    // description: "demo",
    //img: "assests/x.png",

  };

  padiFor = false;
  ngAfterViewInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            // 'shipping_preferences': 'NO_SHIPPING',
            purchase_units: [
              {
                // description: this.product_ordered.description,
                amount: {
                  //currency_code: "USD",
                  value: this.finalAmount,
                },
              },
            ],
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
  constructor(public cartop: CartoperationsService) { }

  ngOnInit(): void {
  }
  abcd() {
    console.log(this.product_ordered)
  }
}
