import { Component, OnInit } from '@angular/core';
import { LogindataService } from './logindata.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { logincla } from "./login";

@Component({
  selector: 'app-loginpage',
  templateUrl : './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  loginForm : FormGroup;
  error:string;
  constructor(private _loginser:LogindataService,private _rou:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      u_EmailId: new FormControl(null),
      u_password: new FormControl(null)
    });
  }

  onLogin()
  {
    console.log(this.loginForm);
    if (this.loginForm.get('u_EmailId').value!=null && this.loginForm.get('u_password').value!=null) {
      console.log("sucess");
      this._loginser.login(this.loginForm.value).subscribe(
        (x: logincla[]) => {
          if (x.length == 1) {
            console.log(x);
            alert("You have successfully log in");
            // localStorage.setItem('u_EmailId',this.loginForm.get('u_EmailId').value);
            this._rou.navigate(['']);
          }
          else{
            alert("invalid id & password");
        }
       }
      );
      }
    else {
      alert("id password should not be empty.");
    }
  }
}
