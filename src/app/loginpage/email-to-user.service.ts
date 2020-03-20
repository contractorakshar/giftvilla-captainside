import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailToUserService {
  public url: string = "http://localhost:3000/admin/";
  public emailurrl: string = "http://localhost:3000/email"
  constructor(public _http: HttpClient) { }
  passwordMail(u_EmailId, sub, u_password) {
    console.log(u_EmailId, sub, u_password);
    let body = {
      "name": u_EmailId,
      "message": u_password,
      "subject": sub
    }
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.emailurrl, body, { headers: header });
  }
  getUserByEmail(u_EmailId: string) {
    return this._http.get(this.url + u_EmailId);
  }
}
