import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { productdisplay } from '../productdisplay';
import { productphotodisplay } from '../productphotodisplay';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-view-more-product',
  templateUrl: './view-more-product.component.html',
  styleUrls: ['./view-more-product.component.css']
})
export class ViewMoreProductComponent implements OnInit {
  images: any[];
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
  imageUrl: string = environment.url;
  images1 = [];
  constructor(public _proser: ProductServiceService, public _rou: Router, public _actRou: ActivatedRoute) { }


  ngOnInit(): void {


    this.images = [];

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

    // console.log(this.images);
    this._proser.getproductphoto(this.pro_id).subscribe(
      (data: productphotodisplay[]) => {
        this.picarr = data;
        for (const img of this.picarr) {
          let imgPath: string = this.imageUrl + img.photo;
          this.images.push({ source: imgPath, alt: 'Description for Image ', title: 'Title ' });
          console.log(imgPath);
        }



        // for (this.i = 0; this.i < this.picarr.length; this.i++) {
        //   this.photo = this.picarr[this.i].photo;
        // }
        // this.images.push({ source: this.picarr[this.i].photo.toString, alt: 'Description for Image 1', title: 'Title 1' });
        // }
      });
    // this.images1.push(this.images.values);
    // console.log(this.images);




    // });
    // this.fk_cat_id = this.arr[0].fk_cat_id;
    // console.log(this.fk_cat_id);
    // this._proser.getViewmoreRelatedProducts(this.fk_cat_id).subscribe((data: productdisplay[]) => {
    //   this.relatedpicarr = data;
    //   console.log(this.relatedpicarr);
    //   for (this.i = 0; this.i < this.relatedpicarr.length; this.i++) {
    //     if (this.pro_id != this.relatedpicarr[this.i].pro_id) {
    //       this.relatedpicarr1 = this.relatedpicarr;
    //     }
    //   }
    //   console.log(this.relatedpicarr1);
    // });


  }
  onwishlist() {
    alert("Product Is Added To Your WishList Table");
    this._rou.navigate(['/wishlist']);

  }

}

