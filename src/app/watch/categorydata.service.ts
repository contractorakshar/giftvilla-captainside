import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { categories } from '../category';

@Injectable({
  providedIn: 'root'
})
export class CategorydataService {
  public url: string = environment.url + "category/";
  cat: categories[] = [];
  public deleteUrl: string = environment.url + "category_Delete/";

  constructor(private _http: HttpClient) { }

  deleteAll(item: number[]) {
    console.log(item);
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.deleteUrl, body, { headers: head });
  }
  getAllCategory() {
    return this._http.get(this.url);
  }
  getCategoryById(cat_id: number) {
    return this._http.get(this.url + cat_id);
  }
  updateCategory(item: categories) {
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url + item.cat_id, body, { headers: head });
  }
  categoryadd(item: categories) {
    console.log(item);
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url, body, { headers: head });
  }
  deleteCategory(cat_id: number) {
    let head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.delete(this.url + cat_id, { headers: head });
  }
}
