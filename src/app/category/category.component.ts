import { Component, OnInit } from '@angular/core';
import { categories } from '../category';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { productdisplay } from '../productdisplay';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryarr:productdisplay[]=[];
  arr: productdisplay[] = [];
  cat_id:number;
  cat_name:string;
  constructor(private _productData: ProductServiceService,
    private act_rout:ActivatedRoute,private _router: Router) {
      _router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          let cat_id = this.act_rout.snapshot.params['cat_id'];
          this.getItemByCategory(cat_id);
        }
      });
    }

  ngOnInit(){
    this._productData.getAllCategory().subscribe(
      (data: productdisplay[]) => {
        this.categoryarr = data;
        console.log(data);
      });

    let cat_id = this.act_rout.snapshot.params['cat_id'];
    this.getItemByCategory(cat_id);
  }

  getItemByCategory(CatID:number) {
    this._productData.updateproductcategory(CatID).subscribe(
      (data: productdisplay[]) => {
      this.arr = data;
    });
  }

}
