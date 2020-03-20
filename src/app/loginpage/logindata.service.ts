import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogindataService {
  public url: string = "http://localhost:3000/login/";

  constructor(public _http: HttpClient) { }
  login(obj: FormData) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url, body, { headers: head });
  }

}
