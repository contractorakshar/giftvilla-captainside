import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchproductService {

  url = "http://localhost:3000/searchproduct/";
  constructor(private _http: HttpClient) { }

  getSearchCategory(cat_name : string) {
    return this._http.get(this.url+cat_name);
  }
}
