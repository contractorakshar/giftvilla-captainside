import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapfeedbackService {
  //public url: string = environment.url + "admin/";
  public url: string = environment.url + "feedback/";

  constructor(private _http: HttpClient) {
  }

  addFeedback(item) {

    console.log(item);
    return this._http.post(this.url, item);
  }
  // getAllProducts() {
  //   return this._http.get(this.url);
  // }
}
