import { Component, OnInit } from '@angular/core';
import { LogindataService } from './logindata.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { logincla } from './login';
import { EmailToUserService } from './email-to-user.service';
import { User } from '../user';
import { UserserviceService } from '../userservice.service';
import { MemberOperationService } from '../member-operation.service';

declare var require: any;
const dateFormat = require('dateformat');
const now = new Date();


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  todaysDate = dateFormat(now, 'yyyy-mm-dd');
  hide = true;
  flag: Boolean = false;
  // hide = true;
  em: string;
  loginForm: FormGroup;
  error: string;
  userType: string;
  display123: boolean = false;
  display1: boolean = false;
  constructor(private _loginser: LogindataService, private _rou: Router, private _mail: EmailToUserService, private _userService: UserserviceService, private memObj: MemberOperationService) { }

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
      this._mail.passwordMail(a, "Forgotten Password", " Forgot password request maid for your account .Your Password is   " + data[0].u_password + "this is Giftvilla service").subscribe((data) => {
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
            this.userType = x[0].u_Type;
            localStorage.setItem('u_EmailId', this.loginForm.get('u_EmailId').value);

            if (this.userType == 'member') {
              console.log('member');
              this._userService.getuserbyemailid(localStorage.getItem('u_EmailId')).subscribe(
                (dataType: User[]) => {
                  console.log(dataType);
                  this.memObj.OffersDetails(localStorage.getItem('u_EmailId')).subscribe(
                    (dataMemberDetails: any[]) => {
                      console.log(dataMemberDetails);
                      if (this.todaysDate >= dataMemberDetails[0].End_date) {
                        console.log(dataMemberDetails[0].End_date);
                        this.memObj.updateCtoM(localStorage.getItem('u_EmailId')).subscribe(
                          (dataTypeUpdate: any[]) => {
                            console.log(dataTypeUpdate);
                          }
                        );
                      }
                    }
                  );
                }
              );
            }

            this._rou.navigate(['/']);
          }
          else {

            this.display123 = true;
          }
        }
      );
    }
    else {
      this.display1 = true;
    }
  }
  DontAcc() {
    this._rou.navigate(['/registration']);
  }
}
