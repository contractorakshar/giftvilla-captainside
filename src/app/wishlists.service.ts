import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistsService {
  url = "http://localhost:3000/wishlist/";
  constructor(private _http:HttpClient) { }
  getWishList(u_EmailId:string)
  {
    return this._http.get(this.url + u_EmailId);
  }
}
