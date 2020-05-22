import { Component, OnInit } from '@angular/core';
import { SearchproductService } from './searchproduct.service';
import { Router, ActivatedRoute } from '@angular/router';
import { productdisplay } from '../productdisplay';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

  arr : productdisplay[] = [];
  cat_name : string;
  constructor(private _searchser : SearchproductService,private _rou : Router,private _actrou : ActivatedRoute) { }

  ngOnInit(): void {
    this.cat_name = this._actrou.snapshot.params['cat_name'];

    this._searchser.getSearchCategory(this.cat_name).subscribe((data : productdisplay[])=>{
      this.arr = data;
      console.log(this.arr);
    });
  }

}
