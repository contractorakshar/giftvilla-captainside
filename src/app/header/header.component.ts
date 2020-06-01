import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';
import { Router, ActivatedRoute } from '@angular/router';
import { CartoperationsService } from '../cart/cartoperations.service';
import { Maincart } from '../cart/maincart';
import { ProductServiceService } from '../product-service.service';
import { CartDetails } from '../cart/cart-details';

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
  arr: string[] = [];
  GrandTotal: number = 0;
  searchName: string = "";
  cat_id: number;
  search;
  pro_id: number;

  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  constructor(public router: Router, private act_rout: ActivatedRoute, private _cartService: CartoperationsService, private _productData: ProductServiceService) { }

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
  searchProduct() {
    for (let i = 0; i < this.category.length; i++) {
      if (this.category[i].cat_name == this.searchName) {
        this.cat_id = this.category[i].cat_id;

      }
    }

    if (this.cat_id > 0) {
      this._productData.getproductBycategory(this.cat_id).subscribe(
        (data: any[]) => {
          this.arr = data;
          // this.router.navigate(['viewMoreProduct/:pro_id']);
          this.router.navigate(['/productdrop', this.cat_id]);
        }
      );
    }
    else {
      console.log("else ma avu");
      // this.pro_id=this.act_rout.snapshot.params['pro_id'];
      // console.log(this.pro_id);
      this._productData.getDataByProductName(this.searchName).subscribe(
        (data: any) => {
          console.log(data);
          this.arr = data;
          this.pro_id = data[0].pro_id;
          console.log(data[0].pro_id);
          this.router.navigate(['viewMoreProduct',this.pro_id]);
          // this.router.navigate(['/productdrop', this.cat_id]);
        }
      );
    }
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  onChangePassword() {
    this.u_EmailId = localStorage.getItem['u_EmailId'];
    this.router.navigate(['/passwordchange', this.u_EmailId]);
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
