import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MemberOperationService } from '../member-operation.service';
import { UserserviceService } from '../userservice.service';
import { User } from '../user';
declare let paypal: any;
declare var require: any;
const dateFormat = require('dateformat');
const now = new Date();
@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css']
})
export class OfferPageComponent implements OnInit, AfterViewInit {
  @ViewChild("paypal") paypalele: ElementRef;
  d = dateFormat(now, 'yyyy-mm-dd');
  dateArray = [];
  memberDetails: any[];
  year;
  mon;
  ey: number;
  day;
  display: boolean = false;
  display2: boolean = false;
  period;
  sd: number;
  advantage: string;
  endyear: string;
  EmailID;
  UserType: string;
  offerSubscribed;
  dis1: boolean = false;
  final;
  divoffererr: boolean;
  description = 'str';

  constructor(private _rout: Router, private _memberService: MemberOperationService, private userobj: UserserviceService) { }

  ngOnInit(): void {

  }

  padiFor = false;
  ngAfterViewInit() {

    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.description,
                amount: {
                  //currency_code: "USD",
                  value: this.final,
                },
              },
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            }
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.padiFor = true;
          console.log(order, this.padiFor);
          if (this.padiFor == true) {

            if (this.final == 600) {
              this.Offer1Slected();
            }
            if (this.final == 900) {
              this.Offer2Slected();
            }
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypalele.nativeElement);
  }
  abc(txt: string) {
    // console.log(txt);
    if (localStorage.getItem('u_EmailId') == null) {

      this._rout.navigate(["/loginpage"]);

    }
    else {
      if (txt == '600') {
        this.final = 600;
      }
      else {
        this.final = 900;
      }

    }
  }
  Offer1Slected() {


    this.EmailID = localStorage.getItem('u_EmailId');
    this.userobj.getuserbyemailid(this.EmailID).subscribe(
      (dataType: User[]) => {
        this.UserType = dataType[0].u_Type;
        console.log(dataType, this.UserType);
        if (this.UserType === 'customer' || this.UserType === 'Customer') {
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
              this.dis1 = true;
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
          this._memberService.OffersDetails(this.EmailID).subscribe(
            (dataMemberDetails: any[]) => {
              this.ey = dataMemberDetails[0].End_date;
              console.log(this.ey);
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
              // if (this.d <= this.ey) {
              //   this.display = true;
              //   console.log("offer chlu");
              //   this._memberService.OffersDetails(this.EmailID).subscribe(
              //     (data: any[]) => {
              //       console.log(data);
              //       this.memberDetails = data;
              //       this.sd = this.memberDetails[0].Start_date;
              //       this.ey = this.memberDetails[0].End_date;
              //       this.offerSubscribed = this.memberDetails[0].offer_Price;
              //       if (this.offerSubscribed == 600) {
              //         this.advantage = 'You have 8% discount on all your orders and free delivery till offer is valid* T&C apply';
              //       }

              //       else {
              //         this.advantage = 'You have 10% discount on all your orders and free delivery till offer is valid* T&C apply';
              //       }
              //     }
              //   );


              // }
            }
          );
        }

      }
    );

  }
  Offer2Slected() {
    console.log('2');
    if (localStorage.getItem('u_EmailId') == null) {
      this._rout.navigate(["/loginpage"]);
    }
    else {
      this.EmailID = localStorage.getItem('u_EmailId');
      this.userobj.getuserbyemailid(this.EmailID).subscribe(
        (dataType: User[]) => {
          this.UserType = dataType[0].u_Type;
          console.log(dataType, this.UserType);
          if (this.UserType === 'customer' || this.UserType === 'Customer') {
            //membersub
            this.mon = dateFormat(now, 'mm');
            this.year = dateFormat(now, 'yyyy');
            this.day = dateFormat(now, 'dd');


            this.mon = parseInt(this.mon) + 9;
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
              offer_Price: 900
            };

            console.log(memberSubscription);
            this._memberService.Addmember(memberSubscription).subscribe(
              (dataMemberAdded: any[]) => {
                console.log(dataMemberAdded);
                this.dis1 = true;
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
                console.log(this.ey);
                console.log(dataMemberDetails);
                if (this.d > dataMemberDetails[0].End_date) {

                  this.mon = dateFormat(now, 'mm');
                  this.year = dateFormat(now, 'yyyy');
                  this.day = dateFormat(now, 'dd');
                  this.mon = parseInt(this.mon) + 9;
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
                    offer_Price: 900
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
                // if (this.d <= this.ey) {
                //   this.display2 = true;
                //   console.log("offer chlu");
                //   this._memberService.OffersDetails(this.EmailID).subscribe(
                //     (data: any[]) => {
                //       console.log(data);
                //       this.memberDetails = data;
                //       this.sd = this.memberDetails[0].Start_date;
                //       this.ey = this.memberDetails[0].End_date;
                //       this.offerSubscribed = this.memberDetails[0].offer_Price;
                //       if (this.offerSubscribed == 600) {
                //         this.advantage = 'You have 8% discount on all your orders and free delivery till offer is valid* T&C apply';
                //       }

                //       else {
                //         this.advantage = 'You have 10% discount on all your orders and free delivery till offer is valid* T&C apply';
                //       }
                //     }
                //   );


                // }
              }
            );
          }

        }
      );
    }


  }
}


