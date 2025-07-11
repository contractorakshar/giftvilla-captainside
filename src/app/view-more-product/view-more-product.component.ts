import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { productdisplay } from '../productdisplay';
import { productphotodisplay } from '../productphotodisplay';
import { environment } from 'src/environments/environment';
import { WishlistOperationsService } from '../wishlist-operations.service';
import { Maincart } from '../cart/maincart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartDetails } from '../cart/cart-details';
import { CartoperationsService } from '../cart/cartoperations.service';

@Component({
  selector: 'app-view-more-product',
  templateUrl: './view-more-product.component.html',
  styleUrls: ['./view-more-product.component.css']
})
export class ViewMoreProductComponent implements OnInit {
  u_EmailId: string;
  arr: productdisplay[] = [];
  picarr: productphotodisplay[] = [];
  relatedpicarr: productdisplay[] = [];
  relatedpicarr1: productdisplay[] = [];
  pro_id: number;
  cartProductItem: productdisplay = null;
  currentCartItem: CartDetails = null;
  SubTotal = 0;
  GrandTotal = 0;
  UserId: string = localStorage.getItem('u_EmailId');
  fk_pro_id: number;
  fk_cat_id: number;
  pro_img: string;
  photo: string;
  pro_price: number;
  pro_name: string;
  pro_qty: number;
  cat_name: string;
  pro_mfg: string;
  pro_info: string;
  i: number;
  wishlistItems: any[] = [];
  wishlistFlag: boolean = false;
  alredyf: boolean = false;
  relatedProduct: any[] = [];
  responsiveOptions;
  constructor(public _proser: ProductServiceService, public _rou: Router, public _actRou: ActivatedRoute, private wishlistService: WishlistOperationsService, private _cartService: CartoperationsService, private _snackBar: MatSnackBar) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {

    this.u_EmailId = localStorage.getItem('u_EmailId');

    this.pro_id = this._actRou.snapshot.params['pro_id'];
    this._actRou.params.subscribe((dataid) => {
      this.pro_id = dataid.pro_id;

      this._proser.getProductById(this.pro_id).subscribe((data: productdisplay[]) => {
        this.arr = data;
        this.pro_name = data[0].pro_name;
        this.pro_price = data[0].pro_price;
        this.pro_mfg = data[0].pro_mfg;
        this.pro_img = data[0].pro_img;
        this.pro_info = data[0].pro_info;
        this.fk_cat_id = data[0].fk_cat_id;
        this.cat_name = data[0].cat_name;

        this._proser.getproductBycategory(this.fk_cat_id).subscribe(
          (dataSuggested: any) => {
            this.relatedProduct = dataSuggested;
          }
        );

      });


      this._proser.getproductphoto(this.pro_id).subscribe(
        (data: productphotodisplay[]) => {
          this.picarr = data;

        });
    });
  }
  AddTowishlist() {
    // this._rou.navigate(['/wishlist']);
    if (localStorage.getItem('u_EmailId') != null) {
      let wishlistObj = {
        fk_pro_id: this.pro_id,
        fk_u_EmailId: this.u_EmailId,
      };
      this.wishlistService.getAllwishlistItems(localStorage.getItem('u_EmailId')).subscribe(
        (dataproduct: any[]) => {
          // console.log(dataproduct);
          this.wishlistItems = dataproduct;
          console.log(dataproduct, localStorage.getItem('u_EmailId'));
          for (let i = 0; i < dataproduct.length; i++) {
            if (this.pro_id == dataproduct[i].fk_pro_id) {
              // console.log(this.pro_id, 'already');
              this.alredyf = true;
              this._snackBar.open(this.pro_name + '  Already in your  Wishlist', 'Close', {
                duration: 2000,
                panelClass: ['blue-snackbar']
              });
            }
          }
          if (this.alredyf == false) {

            this.wishlistService.addToWishlist(wishlistObj).subscribe(
              (dataWislist: any[]) => {
                this._snackBar.open(this.pro_name + '  Added to Wishlist', 'Close', {
                  duration: 2000,
                  panelClass: ['blue-snackbar']
                });

                // console.log(dataWislist);
              }
            );
          }

        }
      );
    }
    else {
      this.wishlistFlag = true;
    }
  }
  onAddToCart(item: productdisplay) {
    console.log(item);
    this.cartProductItem = item;
    this.SubTotal = this._cartService.doSubTotal(this.cartProductItem.pro_price, 1);
    this.currentCartItem = new CartDetails(this.cartProductItem, 1, this.SubTotal);
    if (localStorage.getItem('cart') == null) {
      const cartItems: CartDetails[] = [];
      cartItems.push(this.currentCartItem);
      this.GrandTotal = this._cartService.doGrandTotal(cartItems);
      const myCart = new Maincart(cartItems, this.GrandTotal, this.UserId);
      localStorage.setItem('cart', JSON.stringify(myCart));
    }
    else {
      const cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
      let index: number = -1;
      if (cart.CartItems.length >= 0) {
        index = cart.CartItems.map(function (x) {
          return x.Product.pro_id;
        }).indexOf(item.pro_id);
      }
      if (index == -1) {
        cart.CartItems.push(this.currentCartItem);
        cart.GrandTotal = this._cartService.doGrandTotal(cart.CartItems);
        // cart.u_EmailId = this.UserId;
        localStorage.setItem('cart', JSON.stringify(cart));

      }
      else {
        const cartItem: CartDetails = cart.CartItems[index];
        cartItem.Quantuty += 1;
        cartItem.SubTotal = this._cartService.doSubTotal(this.cartProductItem.pro_price, cartItem.Quantuty);
        cart.CartItems[index] = cartItem;

        cart.GrandTotal = this._cartService.doGrandTotal(cart.CartItems);
        // cart.u_EmailId = this.UserId;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    console.log(localStorage.getItem('cart'));
    this._snackBar.open(this.cartProductItem.pro_name + 'Added to cart', 'Close', {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });

  }
  onViewMore(id) {
    this._rou.navigate(['/viewMoreProduct', id]);

  }

}

