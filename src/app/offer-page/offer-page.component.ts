import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberOperationService } from '../member-operation.service';
import { UserserviceService } from '../userservice.service';
import { User } from '../user';

declare var require: any;
const dateFormat = require('dateformat');
const now = new Date();
@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css']
})
export class OfferPageComponent implements OnInit {
  d = dateFormat(now, 'yyyy-mm-dd');
  dateArray = [];
  memberDetails: any[];
  year;
  mon;
  ey: number;
  day;
  display: boolean = false;
  period;
  sd: number;
  advantage: string;
  endyear: string;
  EmailID;
  UserType: string;
  offerSubscribed;
  constructor(private _rout: Router, private _memberService: MemberOperationService, private userobj: UserserviceService) { }

  ngOnInit(): void {
  }
  Offer1Slected() {
    if (localStorage.getItem('u_EmailId') == null) {
      this._rout.navigate(["/loginpage"]);
    }
    else {
      this.EmailID = localStorage.getItem('u_EmailId');
      this.userobj.getuserbyemailid(this.EmailID).subscribe(
        (dataType: User[]) => {
          this.UserType = dataType[0].u_Type;
          console.log(dataType, this.UserType);
          if (this.UserType === 'customer') {
            //membersub
            this.mon = dateFormat(now, 'mm');
            this.year = dateFormat(now, 'yyyy');
            this.day = dateFormat(now, 'dd');


            this.mon = parseInt(this.mon) + 6;
            if (this.mon > 12) {

              this.year = parseInt(this.year) + 1;
              console.log(this.year);
              let rem = this.mon % 12;
              this.mon = '0';
              this.mon = this.mon + rem;
            }
            this.endyear = this.year + '-' + this.mon + '-' + this.day;
            console.log(this.endyear);
            this.ey = parseInt(this.endyear);
            let memberSubscription = {
              fk_u_EmailId: this.EmailID,
              start_date: this.d,
              end_date: this.endyear,
              offer_Price: 600
            };

            console.log(memberSubscription);
            this._memberService.Addmember(memberSubscription).subscribe(
              (dataMemberAdded: any[]) => {
                console.log(dataMemberAdded);
                this._memberService.updateCustomerType(this.EmailID).subscribe(
                  (dataTypeUpdated: any[]) => {
                    console.log(dataTypeUpdated);
                  }
                );
              }
            );
          }
          if (this.UserType === 'member') {
            console.log("member ma");
            //offer finsih and update

            // Date.prototype.addMonths = function (vakue) {
            //   var n = this.getDate();
            //   this.setDate(1);
            //   this.setMonth(this.get)
            // }
            this._memberService.OffersDetails(this.EmailID).subscribe(
              (dataMemberDetails: any[]) => {
                this.ey = dataMemberDetails[0].End_date;
                console.log(dataMemberDetails);
                if (this.d > dataMemberDetails[0].End_date) {
                  this.mon = dateFormat(now, 'mm');
                  this.year = dateFormat(now, 'yyyy');
                  this.day = dateFormat(now, 'dd');
                  this.mon = parseInt(this.mon) + 6;
                  if (this.mon > 12) {
                    this.year = parseInt(this.year) + 1;
                    console.log(this.year);
                    let rem = this.mon % 12;
                    this.mon = '0';
                    this.mon = this.mon + rem;
                  }
                  this.endyear = this.year + '-' + this.mon + '-' + this.day;
                  console.log(this.endyear);
                  // this.ey = parseInt(this.endyear);
                  let memberSubscription = {
                    fk_u_EmailId: this.EmailID,
                    start_date: this.d,
                    end_date: this.endyear,
                    offer_Price: 600
                  };
                  console.log(memberSubscription);
                  this._memberService.Addmember(memberSubscription).subscribe(
                    (dataMemberAdded: any[]) => {
                      console.log(dataMemberAdded);
                      this._memberService.updateCustomerType(this.EmailID).subscribe(
                        (dataTypeUpdated: any[]) => {
                          console.log(dataTypeUpdated);
                        }
                      );
                    }
                  );
                }
                if (this.ey <= this.d) {
                  console.log("offer chlu");
                  this._memberService.OffersDetails(this.EmailID).subscribe(
                    (data: any[]) => {
                      console.log(data);
                      this.memberDetails = data;
                      this.sd = this.memberDetails[0].Start_date;
                      this.ey = this.memberDetails[0].End_date;
                      this.offerSubscribed = this.memberDetails[0].offer_Price;
                      if (this.offerSubscribed == 600) {
                        this.advantage = 'You have 8% discount on all your orders and free delivery till offer is valid* T&C apply';
                      }

                      else {
                        this.advantage = 'You have 10% discount on all your orders and free delivery till offer is valid* T&C apply';
                      }
                    }
                  );

                  this.display = true;
                }
              }
            );
          }

        }
      );
    }

  }
}
