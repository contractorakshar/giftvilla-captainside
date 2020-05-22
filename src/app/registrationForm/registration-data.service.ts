import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {

  public url:string=environment.url+"/signup/";
  constructor( public _http:HttpClient ) { }

  signup(obj:FormData)
  {
    return this._http.post(this.url,obj);
  }
}
