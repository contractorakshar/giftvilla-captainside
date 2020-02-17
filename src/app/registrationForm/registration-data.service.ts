import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {

  public url:string="http://localhost:3000/signup/";
  constructor( public _http:HttpClient ) { }

  signup(obj:FormData)
  {
    return this._http.post(this.url,obj);
  }
}
