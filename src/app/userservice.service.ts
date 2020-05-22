import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  public ShippingUrl: string = environment.url + 'ShippingUpdate/';
  public url: string = environment.url + "admin/";
  public deleteUrl: string = environment.url + "user_Delete/";
  public url1: string = environment.url + "edit_img/";

  constructor(private _http: HttpClient) { }

  deleteAll(item: string[]) {
    console.log(item);
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.deleteUrl, body, { headers: head });
  }

  deleteData(u_EmailId: string) {
    console.log(this.url);
    console.log(u_EmailId);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.delete(this.url + u_EmailId, { headers: head });
  }

  getUserData() {
    return this._http.get(this.url);
  }


  getuserbyemailid(u_EmailId: string) {
    return this._http.get(this.url + u_EmailId);
  }
  updateuser(u_EmailId, item) {
    let body = JSON.stringify(item);
    let head1 = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url + u_EmailId, body, { headers: head1 });
  }
  updateShippingDetails(u_EmailId, item) {
    let body = JSON.stringify(item);
    console.log(item);
    let head1 = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.ShippingUrl + u_EmailId, body, { headers: head1 });

  }
  edituserimage(u_EmailId, item) {
    return this._http.put(this.url1 + u_EmailId, item);
  }

  addUser(item) {
    // let body = JSON.stringify(item);
    // let x = new HttpHeaders().set('Content-Type', 'application/json');
    // return this._http.post(this.url, body, { headers: x });
    return this._http.post(this.url, item);
  }
}
