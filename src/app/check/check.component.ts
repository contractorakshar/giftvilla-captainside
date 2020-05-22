import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { productphotodisplay } from '../productphotodisplay';
import { ActivatedRoute } from '@angular/router';
declare var require: any;
const dateFormat = require('dateformat');
const now = new Date();
@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  d = dateFormat(now, 'yyyy-mm-dd');
  pro_id: number;
  picarr: productphotodisplay[] = [];

  constructor(public _proser: ProductServiceService, public _actRou: ActivatedRoute) { }


  ngOnInit(): void {
    //this.pro_id = this._actRou.snapshot.params['pro_id'];
    this.pro_id = 3;
    console.log(this.pro_id);
    this._proser.getproductphoto(this.pro_id).subscribe((data: productphotodisplay[]) => {
      this.picarr = data;
      // for(this.i=0;this.i<this.picarr.length;this.i++)
      // {
      //   this.photo = this.picarr[this.i].photo;
      // }
      console.log(this.picarr);
    });

  }


}
