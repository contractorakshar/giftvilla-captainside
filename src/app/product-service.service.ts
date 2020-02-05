import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
url="http://localhost:3000/product/";
  constructor(private _http: HttpClient ) { }
  getAllProducts() {
    return this._http.get(this.url);
  }
}
