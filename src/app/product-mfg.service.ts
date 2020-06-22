import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductMfgService {
  public urlMfg: string = environment.url + 'SortByMfg/';
  constructor(private _http: HttpClient) { }
  getProductByMfg(pro_mfg: string) {
    return this._http.get(this.urlMfg + pro_mfg);
  }
}
