import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ChangepasswordService } from './changepassword.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  hide = true;
  hide1 = true;
  declare psd: string;
  SignupForm: FormGroup;
  u_EmailId: string;

  constructor(private psdchange: ChangepasswordService, public router: Router) { }

  ngOnInit(): void {
    this.u_EmailId = localStorage.getItem('u_EmailId');
    if (this.u_EmailId != null) {
      console.log(this.u_EmailId);
      this.SignupForm = new FormGroup({
        psd: new FormControl(null, [Validators.required]),
        password_group: new FormGroup({
          u_password: new FormControl(null, [Validators.required]),
          u_confirm_password: new FormControl(null)
        }, [this.passwordMatch.bind(this)]),
      });
    }
    else {
      alert("please do login...!!");
    }
  }

  onSignup() {

    let userobj = {
      u_password: this.SignupForm.value.password_group.u_password,
      u_EmailId: this.u_EmailId
    };
    this.psdchange.chanagepsd(userobj).subscribe(
      (x: any) => {
        console.log(userobj);
        // alert('Your Detalis Are Saved');
        this.router.navigate(['/userinfo']);
      }
    );
  }


  passwordMatch(c: AbstractControl): { [s: string]: boolean } {
    const pass = c.get('u_password').value;
    const cpass = c.get('u_confirm_password').value;
    if (pass != cpass) {

      return { 'notSame': true };
    }
    return null;
  }
}
