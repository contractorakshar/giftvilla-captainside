import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishToFriendService {
  public urlWish: string = environment.url + 'Wishes/';
  constructor(private _http: HttpClient) { }
  AddWishDetails(fb) {
    console.log(fb);
    return this._http.post(this.urlWish, fb);
  }
}
