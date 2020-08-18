import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderdataService } from '../orderdata.service';
import { CancelOrderService } from '../cancel-order.service';
import { orders } from '../order_bill';
import { productdisplay } from '../productdisplay';
import { Maincart } from '../cart/maincart';
import { ProductServiceService } from '../product-service.service';
@Component({
  selector: 'app-my-order-view-more',
  templateUrl: './my-order-view-more.component.html',
  styleUrls: ['./my-order-view-more.component.css']
})
export class MyOrderViewMoreComponent implements OnInit {
  fk_u_EmailId: string;
  len: number;
  u_EmailId: string = '';
  order_id: number;
  qty: any[];
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  orderAssignarr: any[];
  OrderNotAssignArr: any[];
  orderDetails: any[];
  dataproqty: any[];
  processing: string;
  arrMyOrder: any[];
  Display: boolean = false;
  Display2: boolean = false;
  od: number;
  status: string;
  delivery_date: string;
  bill_date: string;
  delId: string;
  warncancel: boolean = false;
  payment_method: string;
  order_amt: number;
  orderDelDialog: boolean = true;
  walletDetails: any[];
  wallet_amt: number;
  wallet_id: number;
  detail_id: number;
  btnflag: boolean = false;
  orderDetailsarr: orders[];
  constructor(public act_route: ActivatedRoute, public orederdata: OrderdataService, private orderCancel: CancelOrderService, private route: Router, private proServ: ProductServiceService) { }

  ngOnInit(): void {
    this.order_id = this.act_route.snapshot.params['order_id'];
    this.u_EmailId = localStorage.getItem('u_EmailId');

    this.orederdata.getUserOrderCheck(this.order_id).subscribe(
      (dataOrderCheck: any[]) => {

        // if (dataOrderCheck.length > 0) {
        //   this.orederdata.getPtroductById(this.order_id).subscribe(
        //     (dataOrderAssigned: any[]) => {
        //       this.orderAssignarr = dataOrderAssigned;
        //     }
        //   );
        // }

        this.orederdata.getMyOrderByIdNotAssign(this.order_id).subscribe(
          (dataOrderNotAssign: any[]) => {
            // console.log(dataOrderNotAssign);
            this.OrderNotAssignArr = dataOrderNotAssign;
          }
        );
      }
    );
    this.orederdata.getPtroductById(this.order_id).subscribe(
      (databtnCheck: any[]) => {
        if (databtnCheck.length > 0) {
          if (databtnCheck[0].status == 'On The Way' || databtnCheck[0].status == 'Delivered') {
            document.getElementById('btndisplay').style.display = 'none';
          }
        }
      }
    );

  }
  UpadteQty() {

    this.orederdata.getOrderDetailsById(this.order_id).subscribe(
      (dataorderdetails: orders[]) => {
        this.qty = dataorderdetails;
        this.len = dataorderdetails.length;

        for (let i = 0; i < this.len; i++) {

          console.log(this.len);
          this.proServ.getProductById(this.qty[i].fk_pro_id).subscribe(
            (dataproqty: productdisplay[]) => {
              this.dataproqty = dataproqty;
              for (let j = 0; j < this.len; j++) {
                let objQty = {
                  pro_id: this.dataproqty[j].pro_id,
                  pro_qty: this.dataproqty[j].pro_qty + this.qty[i].qty,
                };
                console.log(objQty);
                this.proServ.updateProductQty(objQty).subscribe(
                  (datachng: any[]) => {

                  });
              }
            });
        }
      }
    );


  }
  OnStatusChack(order_id: number) {

    this.orederdata.getUserOrderCheck(order_id).subscribe(
      (dataOrderCheck: any[]) => {

        console.log(dataOrderCheck);
        if (dataOrderCheck.length > 0) {
          this.orederdata.getUserOrderCheckedDetails(order_id).subscribe(
            (dataOrderCheckedDetails: any[]) => {
              console.log(dataOrderCheckedDetails);
              this.orderDetails = dataOrderCheckedDetails;
              this.Display = true;

              this.od = order_id;
              this.status = this.orderDetails[0].status;
              this.delivery_date = this.orderDetails[0].date;
              this.bill_date = this.orderDetails[0].bill_date;
              this.delId = this.orderDetails[0].DelIveryBoyId;
            }
          );
        }
        else {
          // 'order under Processing';
          this.processing = 'Your Order Id ' + order_id + '\n' + 'Is under processing, Order will be delivered Soon';
          this.Display2 = true;

        }
      }
    );
  }
  confirmOrderCancel(od) {
    this.warncancel = false;
    this.orderCancel.getOrderById(this.order_id).subscribe(
      (dataOrder: orders[]) => {
        console.log(dataOrder);
        this.payment_method = dataOrder[0].order_payment;
        this.order_amt = dataOrder[0].order_amt;
        this.bill_date = dataOrder[0].bill_date;
        console.log(this.order_amt, this.payment_method, this.bill_date);
      }
    );
    this.orderCancel.getWalletDetails(this.u_EmailId).subscribe(
      (dataWalletDetails: any[]) => {
        console.log(dataWalletDetails);
        this.walletDetails = dataWalletDetails;
        //this.wallet_amt = this.walletDetails[0].wallet_amount;
        // this.wallet_id = this.walletDetails[0].wallet_id;
      }
    );

    this.orederdata.getPtroductById(this.order_id).subscribe(
      (dataOrderAssigned: any[]) => {


        //order assigend
        if (dataOrderAssigned.length > 0) {
          this.UpadteQty();
          if (dataOrderAssigned[0].status == 'Packing') {
            this.detail_id = dataOrderAssigned[0].detail_id;
            console.log(this.detail_id);
            this.orderCancel.cancelTrack(this.detail_id).subscribe(
              (dataTrackCancel: any[]) => {
                console.log('track cancel');
                this.orderCancel.cancelDeliveryDetails(this.od).subscribe(
                  (dataDeliveryDetailsCancel: any[]) => {
                    console.log('data delivery details cancel');

                    this.orderCancel.cancelOrderDetails(this.od).subscribe(
                      (dataCancelOrderDetails: any[]) => {

                        console.log('data order  details cancel');
                        this.orderCancel.cancelOrder(this.order_id).subscribe(
                          (dataOrderCancel: any[]) => {


                            console.log('order data cancel');
                            if (this.payment_method === 'paypal' || this.payment_method == 'wallet') {
                              if (this.walletDetails.length > 0) {
                                this.wallet_amt = this.walletDetails[0].wallet_amount;
                                this.wallet_id = this.walletDetails[0].wallet_id;

                                let total: number = this.wallet_amt + this.order_amt;
                                let WalletAddDetails = {
                                  wallet_amount: total
                                };
                                this.orderCancel.updateWalletAmount(this.wallet_id, WalletAddDetails).subscribe(
                                  (dataWalletDetailsUpdates: any[]) => {
                                    console.log('wallet amount updated', total);
                                  }
                                );
                              }
                              else {
                                let WallDetailsFirstTime = {
                                  fk_u_EmailId: this.u_EmailId,
                                  order_amt: this.order_amt
                                };
                                // console.log(WallDetailsFirstTime);
                                this.orderCancel.addWalletAmount(WallDetailsFirstTime).subscribe(
                                  (dataWalletFirst: any[]) => {
                                    console.log('amount 1st time credited to account', dataWalletFirst);
                                  }
                                );
                              }
                            }

                          });
                      }
                    );

                  }
                );
              }
            );
          }
        }
        else {
          // order not assigned
          this.UpadteQty();
          this.orderCancel.cancelOrderDetails(this.order_id).subscribe(
            (dataOrderDetails: any[]) => {

              console.log('order details mathi delete');

              this.orderCancel.cancelOrder(this.order_id).subscribe(
                (dataOrderBill: any[]) => {

                  console.log('order mthi delete');
                  this.orderDelDialog = true;
                  if (this.payment_method === 'paypal' || this.payment_method == 'wallet') {
                    if (this.walletDetails.length > 0) {
                      this.wallet_amt = this.walletDetails[0].wallet_amount;
                      this.wallet_id = this.walletDetails[0].wallet_id;

                      let total: number = this.wallet_amt + this.order_amt;
                      let WalletAddDetails = {
                        wallet_amount: total
                      };
                      this.orderCancel.updateWalletAmount(this.wallet_id, WalletAddDetails).subscribe(
                        (dataWalletDetailsUpdates: any[]) => {
                          console.log('wallet amount updated', total);
                        }
                      );
                    }
                    else {
                      let WallDetailsFirstTime = {
                        fk_u_EmailId: this.u_EmailId,
                        order_amt: this.order_amt
                      };
                      console.log(WallDetailsFirstTime);
                      this.orderCancel.addWalletAmount(WallDetailsFirstTime).subscribe(
                        (dataWalletFirst: any[]) => {
                          console.log('amount 1st time credited to account', dataWalletFirst);
                        }
                      );
                    }
                  }

                });

            }
          );

        }
      }
    );
    // location.reload();
    this.route.navigate(['/']);
  }
  OnOrderCancel(order_id) {
    this.od = order_id;
    this.warncancel = true;

  }



}
