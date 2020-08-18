import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  public imagesUrl;

  constructor(private rout: Router) { }

  ngOnInit(): void {


  }


  onClick() {

  }

}
