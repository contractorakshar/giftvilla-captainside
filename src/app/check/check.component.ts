import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {

  }


}
