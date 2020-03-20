import { Component, OnInit } from '@angular/core';
import { orders } from '../order_bill';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderdataService } from '../orderdata.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  arr:orders[]=[];
  fk_u_EmailId:string;
  u_EmailId:string='';
  constructor(public router:Router,public orederdata:OrderdataService,public act_route:ActivatedRoute) { }

  ngOnInit(): void {
    this.u_EmailId=localStorage.getItem('u_EmailId');
    console.log(this.u_EmailId);
    // this.fk_u_EmailId=this.act_route.snapshot.params[this.u_EmailId];
    this.orederdata.getPastOrder(this.u_EmailId).subscribe(
      (data:any)=>{
      this.arr=data;
      console.log(data);
      }

    );
  }

}
