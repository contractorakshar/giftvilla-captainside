import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { productdisplay } from '../productdisplay';
import { productphotodisplay } from '../productphotodisplay';

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

  constructor(public _proser: ProductServiceService, public _rou: Router, public _actRou: ActivatedRoute) { }

  images: any[];

  ngOnInit(): void {


    this.images = [];
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria1.jpg', alt: 'Description for Image 1', title: 'Title 1' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria2.jpg', alt: 'Description for Image 2', title: 'Title 2' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria3.jpg', alt: 'Description for Image 3', title: 'Title 3' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria4.jpg', alt: 'Description for Image 4', title: 'Title 4' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria5.jpg', alt: 'Description for Image 5', title: 'Title 5' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria6.jpg', alt: 'Description for Image 6', title: 'Title 6' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria7.jpg', alt: 'Description for Image 7', title: 'Title 7' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria8.jpg', alt: 'Description for Image 8', title: 'Title 8' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria9.jpg', alt: 'Description for Image 9', title: 'Title 9' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria10.jpg', alt: 'Description for Image 10', title: 'Title 10' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria11.jpg', alt: 'Description for Image 11', title: 'Title 11' });
    this.images.push({ source: 'assets/showcase/images/demo/galleria/galleria12.jpg', alt: 'Description for Image 12', title: 'Title 12' });



    this.u_EmailId = localStorage.getItem('u_EmailId');
    this.fk_pro_id = this._actRou.snapshot.params['fk_pro_id'];
    this.pro_id = this._actRou.snapshot.params['pro_id'];

    this._proser.getProductById(this.pro_id).subscribe((data: productdisplay[]) => {
      this.arr = data;
      this.pro_price = data[0].pro_price;
      this.pro_name = data[0].pro_name;
      this.cat_name = data[0].cat_name;
      this.pro_info = data[0].pro_info;
      this.pro_mfg = data[0].pro_mfg;
      this.pro_img = data[0].pro_img;
      this.fk_cat_id = data[0].fk_cat_id;
      console.log(this.arr);
    });

    this._proser.getproductphoto(this.pro_id).subscribe(
      (data: productphotodisplay[]) => {
        this.picarr = data;
        // for(this.i=0;this.i<this.picarr.length;this.i++)
        // {
        //   this.photo = this.picarr[this.i].photo;
        // }
        console.log(this.picarr);
      });
    // this.fk_cat_id = this.arr[0].fk_cat_id;
    console.log(this.fk_cat_id);
    this._proser.getViewmoreRelatedProducts(this.fk_cat_id).subscribe((data: productdisplay[]) => {
      this.relatedpicarr = data;
      console.log(this.relatedpicarr);
      for (this.i = 0; this.i < this.relatedpicarr.length; this.i++) {
        if (this.pro_id != this.relatedpicarr[this.i].pro_id) {
          this.relatedpicarr1 = this.relatedpicarr;
        }
      }
      console.log(this.relatedpicarr1);
    });

  }

  onwishlist() {
    alert("Product Is Added To Your WishList Table");
    this._rou.navigate(['/wishlist']);

  }

}

