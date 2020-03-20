import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';
import { ProductServiceService } from '../product-service.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  arr: productdisplay[] = [];
  CategoryArr: productdisplay[] = [];

  constructor(private _productData: ProductServiceService,
    private act_rout:ActivatedRoute,private _router: Router) {
      _router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          let cat_id = this.act_rout.snapshot.params['cat_id'];
          this.getItemByCategory(cat_id);
        }
      });
    }

  ngOnInit() {
    this._productData.getAllCategory().subscribe(
      (data: productdisplay[]) => {
        this.CategoryArr = data;
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
