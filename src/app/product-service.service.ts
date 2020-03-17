import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  url = "http://localhost:3000/product/";
  public url3= "http://localhost:3000/category/";
  public url4= "http://localhost:3000/productHome/";
  public url2="http://localhost:3000/categoryById/";
  constructor(private _http: HttpClient) { }
  getAllProducts() {
    return this._http.get(this.url);
  }
  getAllCategory()
  {
    return this._http.get(this.url3);
  }
  getproductBycategory(cat_id:number){
    return this._http.get(this.url2+cat_id);
  }

  getProductById(pro_id: number) {
    //let x = new HttpHeaders().set('Content-Type', 'application/json');
    // return this._http.get(this.url + pro_id, { headers: x });
    //let x = new HttpHeaders().set(environment.header, environment.value);
    //return this._http.get(this.url + pro_id, { headers: x });
    return this._http.get(this.url + pro_id);
  }
  addproduct(item:FormData) {
    //let body=JSON.stringify(item.pro_id);
    //let head=new HttpHeaders ().set(environment.header,environment.value);
    console.log(item);
    return this._http.post(this.url,item);
  }
  updateproductcategory(cat_id){
    // let body = JSON.stringify(item);
    // let head = new HttpHeaders().set(environment.header,environment.value);
    return this._http.get(this.url2 + cat_id);
  }
  getHomeProduct(){
    return this._http.get(this.url4);
  }
  updateproduct(item,pro_id){
    // let body = JSON.stringify(item);
    // let head = new HttpHeaders().set(environment.header,environment.value);
    return this._http.put(this.url + pro_id, item);
  }
}
