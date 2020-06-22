import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderdataService {
  public url: string = environment.url + "order/";
  public deleteUrl: string = environment.url + "order_Delete/";
  public pastUrl: string = environment.url + "pastOrder/";
  public urlOrderStatus = environment.url + 'UserOrderCheck/';
  public urlOrderCheckedDetails = environment.url + 'DetailsOrderCheck/';


  constructor(private _http: HttpClient) { }

  // deleteAll(item: number[]) {
  //   console.log(item);
  //   let body = JSON.stringify(item);
  //   let head = new HttpHeaders().set(environment.header, environment.value);
  //   return this._http.post(this.deleteUrl, body, { headers: head });
  // }

  getPastOrder(fk_u_EmailId: string) {
    return this._http.get(this.pastUrl + fk_u_EmailId);
  }


  // getAllOrder() {
  //   return this._http.get(this.url);
  // }
  // deleteOrder(order_id: number) {
  //   let x = new HttpHeaders().set(environment.header, environment.value);
  //   return this._http.delete(this.url + order_id, { headers: x });
  // }
  getPtroductById(order_id: number) {
    return this._http.get(this.url + order_id);
  }
  getUserOrderCheck(order_id: number) {
    return this._http.get(this.urlOrderStatus + order_id);
  }
  getUserOrderCheckedDetails(order_id: number) {
    return this._http.get(this.urlOrderCheckedDetails + order_id);
  }
}
