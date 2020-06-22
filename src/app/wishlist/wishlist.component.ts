import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';

import { Router, ActivatedRoute } from '@angular/router';
import { orders } from '../order_bill';
import { WishlistsService } from '../wishlists.service';
import { WishlistOperationsService } from '../wishlist-operations.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {


  pro_id: number;
  u_EmailId: string;
  fk_u_EmailId: string;
  wishlistarr: any[] = [];
  constructor(private _wishser: WishlistsService, private _rou: Router, private _actrou: ActivatedRoute, private wishlistService: WishlistOperationsService) { }

  ngOnInit(): void {
    this.u_EmailId = localStorage.getItem('u_EmailId');
    // this.u_EmailId = this._actrou.snapshot.params['u_EmailId'];
    console.log(this.u_EmailId);
    this.wishlistService.getAllwishlistItems(this.u_EmailId).subscribe(
      (dataWishlist: any[]) => {
        this.wishlistarr = dataWishlist;
        console.log(this.wishlistarr);
      }
    );

  }
  onRemoveFromWishlist(fk_pro_id, index) {
    console.log(fk_pro_id);
    this.wishlistService.removeFromWishlist(fk_pro_id).subscribe(
      (dataRemoved: any[]) => {
        this.wishlistarr.splice(index, 1);
      }
    );
  }

}
