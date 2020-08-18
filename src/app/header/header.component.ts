import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';
import { Router, ActivatedRoute } from '@angular/router';
import { CartoperationsService } from '../cart/cartoperations.service';
import { Maincart } from '../cart/maincart';
import { ProductServiceService } from '../product-service.service';
import { CartDetails } from '../cart/cart-details';
import { UserserviceService } from '../userservice.service';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  u_EmailId: string;
  arrcartItems: CartDetails[] = [];
  category: productdisplay[] = [];
  arrwatch: productdisplay[] = [];
  SearchText: productdisplay[] = [];
  GrandTotal: number = 0;
  seacrhArray: productdisplay[] = [];
  dispalymember: boolean = false;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  constructor(public router: Router, private _cartService: CartoperationsService, private _productData: ProductServiceService, private _router: Router, private userobj: UserserviceService) { }

  ngOnInit() {
    // this.arrcartItems = this.cart.CartItems;
    this._productData.getAllCategory().subscribe(
      // this.GrandTotal = this.cart.GrandTotal;
      (data: productdisplay[]) => {
        this.category = data;
        // console.log(data);
        //console.log(data);
      });
  }

  SearchTextBox(txtSearch) {
    console.log(txtSearch);
    if (txtSearch != null) {
      this._router.navigate(['/SearchText', txtSearch]);
    }
  }
  SearchTextBox1(txtSearch) {
    location.reload();
    console.log(txtSearch);
    if (txtSearch != null) {
      this._router.navigate(['/SearchText', txtSearch]);
    }
  }
  Checmember() {


    if (localStorage.getItem('u_EmailId') != null) {
      console.log(localStorage.getItem('u_EmailId'));
      this.userobj.getuserbyemailid(localStorage.getItem('u_EmailId')).subscribe(
        (datall: User[]) => {
          if (datall[0].u_Type == 'member') {
            this.dispalymember = true;
          }
          else {
            this._router.navigate(['/offers']);
          }
        }
      );
    }
    else {
      this._router.navigate(['/loginpage']);
    }
  }
  onLogout() {
    // localStorage.clear();
    localStorage.removeItem('u_EmailId');
    this.router.navigate(['/']);
  }

  onWatchClick(cat_id) {
    console.log(cat_id);
    this.router.navigate(['/productdrop', cat_id]);
    // this._productData.getproductBycategory(cat_id).subscribe(
    //   (data: productdisplay[]) => {
    //     console.log(data);
    //     // this.category = data;
    //     console.log('change');
    //   }
    // );
  }
}
