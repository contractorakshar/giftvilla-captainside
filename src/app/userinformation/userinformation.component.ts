import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserserviceService } from '../userservice.service';
import { environment } from 'src/environments/environment';
import { productdisplay } from '../productdisplay';
import { CancelOrderService } from '../cancel-order.service';
import { MemberOperationService } from '../member-operation.service';

@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.component.html',
  styleUrls: ['./userinformation.component.css']
})
export class UserinformationComponent implements OnInit {
  Display: boolean = false;
  list: productdisplay[] = [];
  u_EmailId: string;
  user_update: FormGroup;
  selectedFile: File = null;
  userurl: string = null;
  WalletDetails: any[];
  OfferDetails: any[];

  constructor(public _activated_routes: ActivatedRoute, public _route: Router, public ser: UserserviceService, public serObj: CancelOrderService, public memberObj: MemberOperationService) { }

  ngOnInit() {
    this.u_EmailId = localStorage.getItem('u_EmailId');
    console.log(this.u_EmailId);

    this.serObj.getWalletDetails(this.u_EmailId).subscribe(
      (dataWallet: any[]) => {
        console.log(dataWallet);
        this.WalletDetails = dataWallet;
      }
    );
    this.memberObj.OffersDetails(this.u_EmailId).subscribe(
      (dataMemberOffers: any[]) => {
        console.log(dataMemberOffers);
        this.OfferDetails = dataMemberOffers;
      }
    );
    //this.u_EmailId = this._activated_routes.snapshot.params['u_EmailId'];
    //console.log(this.u_EmailId);
    this.user_update = new FormGroup({
      u_EmailId: new FormControl(null),
      u_Name: new FormControl(null),
      u_Address: new FormControl(null),
      u_gender: new FormControl(null),
      u_Type: new FormControl(),
      u_password: new FormControl(null),
      u_mobileno: new FormControl(null),
      u_dob: new FormControl(null),
      u_img: new FormControl(null)
    });
    this.ser.getuserbyemailid(this.u_EmailId).subscribe(
      (data: User[]) => {
        this.formDataBind(data[0]);
        console.log(data[0]);
      }
    );
  }
  onUserUpdate() {
    this.ser.updateuser(this.u_EmailId, this.user_update.value).subscribe(
      (data: User[]) => {
        console.log(data);
        this._route.navigate(['/']);
      }
    );

  }

  onUserCancel() {
    this._route.navigate(['/userinfo']);
  }

  editImageuser(u_EmailId) {
    this._route.navigate(['/editImage', u_EmailId]);
    console.log("data");
  }

  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }
  onYesClick() {
    // this.u_EmailId = localStorage.getItem('u_EmailId');
    this._route.navigate(['/loginpage']);
    console.log(this.Display);
  }
  changepassword(u_EmailId) {
    console.log('page call');
    this.u_EmailId = localStorage.getItem('u_EmailId');
    if (localStorage.getItem('u_EmailId') != null) {
      this._route.navigate(['passwordchange',this.u_EmailId]);
    }
    else {

    this.Display = true;
      console.log(this.Display);
      // this.Display=false;
      let stat: string = "please do ligin";
      this.onYesClick();
    }
  }

  formDataBind(item: User) {
    console.log(item);
    this.userurl = environment.url + "images/UserImages/" + item.u_img;
    console.log(this.userurl);
    this.user_update.patchValue({
      u_EmailId: item.u_EmailId,
      u_Name: item.u_Name,
      u_Address: item.u_Address,
      u_gender: item.u_gender,
      // u_Type: item.u_Type,
      // u_password: item.u_password,
      u_mobileno: item.u_mobileno,
      u_dob: item.u_dob,
      u_img: item.u_img,

    });
  }

}
