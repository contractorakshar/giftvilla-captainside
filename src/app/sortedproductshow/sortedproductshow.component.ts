import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';
import { orders } from '../order_bill';

@Component({
  selector: 'app-sortedproductshow',
  templateUrl: './sortedproductshow.component.html',
  styleUrls: ['./sortedproductshow.component.css']
})
export class SortedproductshowComponent implements OnInit {
  arr: orders[] = [];
  constructor(private _productData: ProductServiceService, private _router: Router) { }

  ngOnInit(): void {
    this._productData.getSortedProducts().subscribe((data : orders[])=>{
      this.arr = data;
      console.log("Sorted");
      console.log(this.arr);
    });
  }

}
