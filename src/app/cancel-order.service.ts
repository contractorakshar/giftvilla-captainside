import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CancelOrderService {
  public urlCancelOrder: string = environment.url + 'CancelOrder/';
  public urlCancelOrderDetails = environment.url + 'CancelOrderDetails/';
  public urlCancelTrack = environment.url + 'cancelTrack/';
  public urlcancelDelieveryDetails = environment.url + 'cancelDelieveryDetails/';
  public urlOrderById = environment.url + 'OrderById/';
  constructor(public _http: HttpClient) { }

  cancelOrder(order_id: number) {
    console.log(order_id);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.delete(this.urlCancelOrder + order_id, { headers: head });
  }
  getWalletDetails(fk_u_EmailId: string) {
    return this._http.get(this.urlCancelOrder + fk_u_EmailId);
  }
  getOrderById(od: number) {
    console.log(od);
    return this._http.get(this.urlOrderById + od);
  }
  cancelOrderDetails(fk_order_id: number) {
    console.log(fk_order_id);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.delete(this.urlCancelOrderDetails + fk_order_id, { headers: head });
  }
  cancelTrack(fk_detail_id: number) {
    console.log(fk_detail_id);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.delete(this.urlCancelOrderDetails + fk_detail_id, { headers: head });
  }
  cancelDeliveryDetails(fk_order_id: number) {
    console.log(fk_order_id);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.delete(this.urlCancelOrderDetails + fk_order_id, { headers: head });
  }
  addWalletAmount(item) {
    console.log(item);
    return this._http.post(this.urlCancelOrder, item);
  }
  updateWalletAmount(wallet_id, item) {
    console.log(wallet_id, item);
    return this._http.put(this.urlCancelOrder + wallet_id, item);
  }
  getOrderStatus(fk_detail_id: number) {
    return this._http.get(this.urlCancelOrderDetails + fk_detail_id);
  }
}
