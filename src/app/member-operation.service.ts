import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MemberOperationService {
  public url: string = environment.url + 'memberCustomer/';
  public urlOfferDetails: string = environment.url + 'MemberOffers/';
  public urlCtoM: string = environment.url + 'customerUtype/';
  constructor(private _http: HttpClient) { }
  Addmember(item) {
    return this._http.post(this.url, item);
  }
  updateCustomerType(u_EmailId) {

    return this._http.get(this.url + u_EmailId);
  }
  OffersDetails(u_EmailId) {
    return this._http.get(this.urlOfferDetails + u_EmailId);
  }
  updateCtoM(u_EmailId) {
    return this._http.get(this.urlCtoM + u_EmailId);
  }
  RemoveMemberCustomer(fk_u_EmailId) {

    let head = new HttpHeaders().set(environment.header, environment.value);
    console.log(fk_u_EmailId);
    return this._http.delete(this.url + fk_u_EmailId, { headers: head });
  }

}
