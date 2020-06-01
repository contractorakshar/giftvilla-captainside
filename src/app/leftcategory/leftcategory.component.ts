import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-leftcategory',
  templateUrl: './leftcategory.component.html',
  styleUrls: ['./leftcategory.component.css']
})
export class LeftcategoryComponent implements OnInit {
  category: productdisplay[] = [];
  cat_id: number;
  mfgCat: productdisplay[] = [];


  constructor(public router: Router, private _productData: ProductServiceService) { }

  ngOnInit(): void {
    this._productData.getAllCategory().subscribe(
      (data: productdisplay[]) => {
        this.category = data;
        console.log(data);

      });
    this.mfglistout(this.category[0].cat_id);
  }
  mfglistout(cat_id) {
    console.log(cat_id);
    this._productData.MfgCat(cat_id).subscribe(
      (datamfg: productdisplay[]) => {

        console.log(datamfg);
        this.mfgCat = datamfg;
      }
    );
  }
  onWatchClick(cat_id) {
    console.log(cat_id);
    this.router.navigate(['/productdrop', cat_id]);
  }

}

