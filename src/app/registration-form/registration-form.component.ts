import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistrationDataService } from '../registrationForm/registration-data.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  hide = true;
  hide1 = true;
  SignupForm: FormGroup;
  selectedFile: File = null;

  email = new FormControl('');
  constructor(public _signupser: RegistrationDataService, public _rou: Router) { }

  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }

  ngOnInit(): void {
    this.SignupForm = new FormGroup({
      u_EmailId: new FormControl('', [Validators.required, Validators.email]),
      u_Name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z ]*')]),
      u_Address: new FormControl(null, [Validators.required]),
      u_gender: new FormControl(null),
      u_Type: new FormControl('customer'),
      password_group: new FormGroup({
        u_password: new FormControl(null, [Validators.required]),
        u_confirm_password: new FormControl(null)
      }, [this.passwordMatch.bind(this)]),
      u_mobileno: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      u_dob: new FormControl(null, [Validators.required]),
      u_img: new FormControl(null),
    });
  }

  onSignup() {
    let userobj = new FormData();
    userobj.append("u_EmailId", this.SignupForm.value.u_EmailId);
    userobj.append("u_Name", this.SignupForm.value.u_Name);
    userobj.append("u_Address", this.SignupForm.value.u_Address);
    userobj.append("u_gender", this.SignupForm.value.u_gender);
    userobj.append("u_Type", this.SignupForm.value.u_Type);
    userobj.append("u_password", this.SignupForm.value.password_group.u_password);
    userobj.append("u_mobileno", this.SignupForm.value.u_mobileno);
    userobj.append("u_dob", this.SignupForm.value.u_dob);

    if (this.selectedFile != null) {
      userobj.append("image", this.selectedFile, this.selectedFile.name);
    }
    else {
      userobj.append("image", new Blob(), null);
    }
    console.log(userobj);
    this._signupser.signup(userobj).subscribe(
      (x: any) => {
        console.log(x)
        alert('Your Detalis Are Saved');
        this._rou.navigate(['/']);
        localStorage.setItem('u_EmailId', this.SignupForm.get('u_EmailId').value);
        alert('You have successfully log in');
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

  onSignupCancel() {
    alert("Data Is Not Save...");
    this._rou.navigate(['/']);
  }
}
