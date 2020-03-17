import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  url = "http://localhost:3000/product/";
  url1 = "http://localhost:3000/fkphotos/";
  url2 = "http://localhost:3000/viewmorerelatedproducts/";
  url3 = "http://localhost:3000/sortedProduct/";
  constructor(private _http: HttpClient) { }
  getAllProducts() {
    return this._http.get(this.url);
  }
  getProductById(pro_id: number) {
    //let x = new HttpHeaders().set('Content-Type', 'application/json');
    // return this._http.get(this.url + pro_id, { headers: x });
    //let x = new HttpHeaders().set(environment.header, environment.value);
    //return this._http.get(this.url + pro_id, { headers: x });
    return this._http.get(this.url + pro_id);
  }
  getSortedProducts()
  {
    return this._http.get(this.url3);
  }
  getViewmoreRelatedProducts (fk_cat_id : number)
  {
    return this._http.get(this.url2 + fk_cat_id);
  }
  addproduct(item:FormData) {
    //let body=JSON.stringify(item.pro_id);
    //let head=new HttpHeaders ().set(environment.header,environment.value);
    console.log(item);
    return this._http.post(this.url,item);
  }
  updateproduct(item,pro_id){
    // let body = JSON.stringify(item);
    // let head = new HttpHeaders().set(environment.header,environment.value);
    return this._http.put(this.url + pro_id, item);
  }
  getproductphoto(fk_pro_id)
  {
    return this._http.get(this.url1+fk_pro_id);
  }
}
