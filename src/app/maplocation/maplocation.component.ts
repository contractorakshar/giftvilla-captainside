import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maplocation',
  templateUrl: './maplocation.component.html',
  styleUrls: ['./maplocation.component.css']
})
export class MaplocationComponent implements OnInit {
  zoom = 18;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: "hybrid"
  };
  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(x=>{
      this.center={
        lat:x.coords.latitude,
        lng:x.coords.longitude
      };
    });
   }

}
