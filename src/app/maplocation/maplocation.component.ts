import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MapfeedbackService } from './mapfeedback.service';

const dateFormat = require('dateformat');
const now = new Date();
declare var require: any;
@Component({
  selector: 'app-maplocation',
  templateUrl: './maplocation.component.html',
  styleUrls: ['./maplocation.component.css']
})
export class MaplocationComponent implements OnInit {
  em: string;

  FeedbackForm: FormGroup;
  zoom = 18;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: "hybrid"
  };
  constructor(private fb: FormBuilder, private service_obj: MapfeedbackService) { }

  ngOnInit(): void {

    this.FeedbackForm = new FormGroup({
      fk_u_EmailId: new FormControl(null),
      feedback_msg: new FormControl(null),
      feedback_date: new FormControl(null)
    });
    // this.FeedbackForm.patchValue({
    //   fk_u_EmailId: this.em
    // });
    this.em = localStorage.getItem('u_EmailId');
    if (this.em == "") {
      this.em = "";
    }
    else {
      this.em = localStorage.getItem('u_EmailId');
    }

    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
    });
    if (localStorage.getItem('u_EmailId')) {
      this.em = localStorage.getItem('u_EmailId');
      console.log(this.em);
    }
  }
  onSubmitMessage() {
    //console.log(this.FeedbackForm.get('feedback_msg').value);
    let fb = {
      fk_u_EmailId: this.FeedbackForm.get('fk_u_EmailId').value,
      feedback_msg: this.FeedbackForm.get('feedback_msg').value,
      feedback_date: dateFormat(now, "yyyy-mm-dd"),

    }
    this.service_obj.addFeedback(fb).subscribe(
      (x: any) => {
        console.log(x);
      }
    );

  }

}
