import { Component, OnInit } from '@angular/core';
import { orders } from '../order_bill';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderdataService } from '../orderdata.service';
import { CancelOrderService } from '../cancel-order.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  arr: orders[] = [];
  fk_u_EmailId: string;
  u_EmailId: string = '';
  orderDetails: any[];
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
  constructor(public router: Router, public orederdata: OrderdataService, public act_route: ActivatedRoute, private orderCancel: CancelOrderService) { }

  ngOnInit(): void {
    this.u_EmailId = localStorage.getItem('u_EmailId');
    console.log(this.u_EmailId);
    // this.fk_u_EmailId=this.act_route.snapshot.params[this.u_EmailId];
    this.orederdata.getPastOrder(this.u_EmailId).subscribe(
      (data: any) => {
        this.arr = data;
        // console.log(data);
      }

    );
    this.orederdata.getMyOrderById(this.u_EmailId).subscribe(
      (dataMyOrder: any[]) => {
        this.arrMyOrder = dataMyOrder;
      }
    );

  }
  OnMyOrderViewMore(order_id: number) {
    // console.log(order_id);
    this.router.navigate(['/viewMoreMyOrder', order_id]);
  }
  confirmOrderCancel(od) {
    this.warncancel = false;
    this.orderCancel.getOrderById(od).subscribe(
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

    this.orederdata.getUserOrderCheck(od).subscribe(
      (dataOrderAssigned: any[]) => {
        console.log(dataOrderAssigned);

        if (dataOrderAssigned.length > 0) {
          //order assigend
          console.log(dataOrderAssigned[0].status);
          if (dataOrderAssigned[0].status === 'Packing') {
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
                        this.orderCancel.cancelOrder(this.od).subscribe(
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
                                console.log(WallDetailsFirstTime);
                                this.orderCancel.addWalletAmount(WallDetailsFirstTime).subscribe(
                                  (dataWalletFirst: any[]) => {
                                    console.log('amount 1st time credited to account', dataWalletFirst);
                                  }
                                );
                              }
                            }

                          }
                        );
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
          this.orderCancel.cancelOrderDetails(od).subscribe(
            (dataOrderDetails: any[]) => {
              console.log('order details mathi delete');
              this.orderCancel.cancelOrder(od).subscribe(
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
                }
              );

            }
          );

        }
      }
    );
    // location.reload();
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
          // order under Processing
          this.processing = 'Your Order Id ' + order_id + '\n' + 'Is under processing, Order will be delivered Soon';
          this.Display2 = true;

        }
      }
    );
  }
  OnOrderCancel(order_id) {
    this.od = order_id;
    this.warncancel = true;

  }
}
