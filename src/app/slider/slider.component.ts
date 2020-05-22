import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  public imagesUrl;

  constructor() { }

  ngOnInit(): void {
    // this.imagesUrl = ['../../assets/img/banner/1.jpg', '../../assets/img/banner/2.jpg', '../../assets/img/banner/3.jpg', '../../assets/img/banner/4.jpg', '../../assets/img/banner/5.jpg', '../../assets/img/banner/6.jpg'];
  }


}
