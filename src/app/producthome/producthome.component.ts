import { Component, OnInit } from '@angular/core';
import { productdisplay } from '../productdisplay';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-producthome',
  templateUrl: './producthome.component.html',
  styleUrls: ['./producthome.component.css']
})
export class ProducthomeComponent implements OnInit {
arr:productdisplay[];
  constructor(private _productData: ProductServiceService) { }

  ngOnInit() {
    this._productData.getAllProducts().subscribe((data: productdisplay[]) => {
      this.arr = data;
    });
  }

}
