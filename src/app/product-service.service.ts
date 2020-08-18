import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  public url = environment.url + "product/";
  public url1 = environment.url + "fkphotos/";
  public url21 = environment.url + "viewmorerelatedproducts/";
  public url31 = environment.url + "sortedProduct/";
  public url3 = environment.url + "category/";
  public url4 = environment.url + "productHome/";
  public url2 = environment.url + "categoryById/";
  public urlSearch: string = environment.url + "search_Product/";
  public urlQty: string = environment.url + 'ProQuantity/';
  public urlTextBox = environment.url + 'SerachText/';
  public urlMfgCat = environment.url + 'MfgCat/';
  public urlTopSelling = environment.url + 'TopSellingHomeUser/';
  constructor(private _http: HttpClient) { }
  getAllProducts() {
    return this._http.get(this.url);
  }
  getTopSellingProducts() {
    return this._http.get(this.urlTopSelling);
  }
  getDataByProductName(name: string) {
    console.log(name);
    return this._http.get(this.urlSearch + name);
  }
  getAllCategory() {
    return this._http.get(this.url3);
  }
  getproductBycategory(cat_id: number) {
    return this._http.get(this.url2 + cat_id);
  }
  SeacrchTextBox(pro_name) {
    console.log(pro_name);
    return this._http.get(this.urlTextBox + pro_name);
  }
  MfgCat(cat_id) {
    return this._http.get(this.urlMfgCat + cat_id);
  }

  getProductById(pro_id: number) {
    //let x = new HttpHeaders().set('Content-Type', 'application/json');
    // return this._http.get(this.url + pro_id, { headers: x });
    //let x = new HttpHeaders().set(environment.header, environment.value);
    //return this._http.get(this.url + pro_id, { headers: x });
    return this._http.get(this.url + pro_id);
  }
  getSortedProducts() {
    return this._http.get(this.url31);
  }
  getViewmoreRelatedProducts(fk_cat_id: number) {
    return this._http.get(this.url21 + fk_cat_id);
  }
  updateProductQty(item) {
    // console.log(pro_id, item);
    return this._http.put(this.urlQty, item);
  }
  addproduct(item: FormData) {
    //let body=JSON.stringify(item.pro_id);
    //let head=new HttpHeaders ().set(environment.header,environment.value);
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set(environment.header, environment.value);
    console.log(item);
    return this._http.post(this.url, item);
  }
  updateproductcategory(cat_id) {
    // let body = JSON.stringify(item);
    // let head = new HttpHeaders().set(environment.header,environment.value);
    return this._http.get(this.url2 + cat_id);
  }
  getHomeProduct() {
    return this._http.get(this.url4);
  }
  updateproduct(item, pro_id) {
    // let body = JSON.stringify(item);
    // let head = new HttpHeaders().set(environment.header,environment.value);
    return this._http.put(this.url + pro_id, item);
  }
  getproductphoto(pro_id) {
    return this._http.get(this.url1 + pro_id);

  }

}
