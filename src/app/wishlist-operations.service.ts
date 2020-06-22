import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistOperationsService {
  public urlWishlist: string = environment.url + 'WishlistUser/';
  constructor(private _http: HttpClient) { }
  getAllwishlistItems(fk_u_EmailId) {
    return this._http.get(this.urlWishlist + fk_u_EmailId);
  }
  addToWishlist(item) {
    console.log(item);
    return this._http.post(this.urlWishlist, item);
  }
  removeFromWishlist(fk_pro_id) {
    console.log(fk_pro_id);
    return this._http.delete(this.urlWishlist + fk_pro_id);
  }
}
