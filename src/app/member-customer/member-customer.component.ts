import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-customer',
  templateUrl: './member-customer.component.html',
  styleUrls: ['./member-customer.component.css']
})
export class MemberCustomerComponent implements OnInit {

  constructor(private _rout: Router) { }

  ngOnInit(): void {
  }
  ApplyMember() {
    // alert("hi");
    if (localStorage.getItem('u_EmailId') == null) {
      this._rout.navigate(['/registration']);
    }
    else {
      this._rout.navigate(['/registration']);
    }
  }
}
