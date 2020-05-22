import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  public url: string = environment.url + "changepassword/";
  constructor(public _http: HttpClient) { }

  chanagepsd(obj: any) {
    console.log(obj);
    // console.log(u_EmailId);
    return this._http.put(this.url, obj);
  }
}
