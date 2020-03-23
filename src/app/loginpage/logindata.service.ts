import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogindataService {
  public url:string= environment.url+"/login/";

  constructor(public _http:HttpClient) { }
  login(obj :FormData )
  {
    const body=JSON.stringify(obj);
    const head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head});
  }
}
