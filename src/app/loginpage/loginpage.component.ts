import { Component, OnInit } from '@angular/core';
import { LogindataService } from './logindata.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { logincla } from './login';
import { EmailToUserService } from './email-to-user.service';



@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  hide = true;
  flag: Boolean = false;
  // hide = true;
  em: string;
  loginForm: FormGroup;
  error: string;
  constructor(private _loginser: LogindataService, private _rou: Router, private _mail: EmailToUserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      u_EmailId: new FormControl(null),
      u_password: new FormControl(null)
    });
  }

  forgotPassword() {
    // let a = this.loginForm.get('u_EmailId');
    // console.log(a.value);
    //console.log(this.loginForm.value.u_EmailId);
    if (this.loginForm.get('u_EmailId').value == null) {
      let z = prompt("Enter Email Id");
      if (z != null) {
        console.log(z);
      }
    }
    let a = this.loginForm.get('u_EmailId').value;
    this._mail.getUserByEmail(a).subscribe((data) => {
      console.log(data[0].u_password);
      this._mail.passwordMail(a, "Forgotten Password", data[0].u_password + "this is giftvilla service").subscribe((data) => {
        console.log("mail sent");
      });
    });
  }


  onLogin() {
    console.log(this.loginForm);
    if (this.loginForm.get('u_EmailId').value != null && this.loginForm.get('u_password').value != null) {
      console.log("sucess");
      this._loginser.login(this.loginForm.value).subscribe(
        (x: logincla[]) => {
          if (x.length == 1) {
            console.log(x);
            localStorage.setItem('u_EmailId', this.loginForm.get('u_EmailId').value);
            alert("You have successfully log in");

            this._rou.navigate(['']);
          }
          else {
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
