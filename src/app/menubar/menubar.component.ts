import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { productdisplay } from '../productdisplay';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  category: productdisplay[] = [];
  cat_id: number;

  constructor(public router: Router, private _productData: ProductServiceService) { }

  ngOnInit(): void {
    this._productData.getAllCategory().subscribe(
      (data: productdisplay[]) => {
        this.category = data;
        console.log(data);
      });
  }
  onWatchClick(cat_id) {
    console.log(cat_id);
    this.router.navigate(['/productdrop', cat_id]);
  }
}
