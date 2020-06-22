import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/userservice.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {


  // list: productdisplay[] = [];
  u_EmailId: string;
  user_update: FormGroup;

  constructor(public _activated_routes: ActivatedRoute, public _route: Router, public ser: UserserviceService) { }

  ngOnInit() {
    this.u_EmailId = localStorage.getItem('u_EmailId');
    console.log(this.u_EmailId);
    //this.u_EmailId = this._activated_routes.snapshot.params['u_EmailId'];
    //console.log(this.u_EmailId);
    this.user_update = new FormGroup({
      u_EmailId: new FormControl(null),
      u_Name: new FormControl(null),
      u_Address: new FormControl(null),
      // u_gender: new FormControl(null),
      // u_Type: new FormControl(),
      //u_password: new FormControl(null),
      u_mobileno: new FormControl(null),
      // u_dob: new FormControl(null),
      // u_img: new FormControl(null)
    });
    this.ser.getuserbyemailid(this.u_EmailId).subscribe(
      (data: User[]) => {
        this.formDataBind(data[0]);
        console.log(data[0]);
      }
    );
  }


  formDataBind(item: User) {
    console.log(item);
    this.user_update.patchValue({
      u_EmailId: item.u_EmailId,
      u_Name: item.u_Name,
      u_Address: item.u_Address,
      // u_gender: item.u_gender,
      // u_Type: item.u_Type,
      // u_password: item.u_password,
      u_mobileno: item.u_mobileno,
      // u_dob: item.u_dob,
      // u_img: item.u_img,

    });
  }
  onUserUpdate() {
    this.ser.updateShippingDetails(this.u_EmailId, this.user_update.value).subscribe(
      (data: User[]) => {
        console.log(data);
        this._route.navigate(['/payment']);
      }
    );
  }



}
