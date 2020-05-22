import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';

import { Router, ActivatedRoute } from '@angular/router';
import { orders } from '../order_bill';
import { WishlistsService } from '../wishlists.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  arr : orders[]=[];
  pro_id : number;
  u_EmailId : string;
  fk_u_EmailId : string;
  constructor(private _wishser : WishlistsService,private _rou : Router,private _actrou : ActivatedRoute) { }

  ngOnInit(): void {
    this.u_EmailId=localStorage.getItem('u_EmailId');
    // this.u_EmailId = this._actrou.snapshot.params['u_EmailId'];
    console.log(this.u_EmailId);

    this._wishser.getWishList(this.u_EmailId).subscribe((data : orders[])=>{
      this.arr = data;
    });
  }

}
