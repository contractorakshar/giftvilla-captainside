import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';
import { productdisplay } from '../productdisplay';

@Component({
  selector: 'app-sortedproductshow',
  templateUrl: './sortedproductshow.component.html',
  styleUrls: ['./sortedproductshow.component.css']
})
export class SortedproductshowComponent implements OnInit {
  arr: productdisplay[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
