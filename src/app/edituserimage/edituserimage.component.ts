import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-edituserimage',
  templateUrl: './edituserimage.component.html',
  styleUrls: ['./edituserimage.component.css']
})
export class EdituserimageComponent implements OnInit {
  constructor(private _router: Router, private _actrou: ActivatedRoute, private _userser: UserserviceService) { }
  u_EmailId: string;
  updateuserpic: FormGroup;
  userurl: string = null;
  selectedFile: File = null;

  ngOnInit() {
    this.u_EmailId = this._actrou.snapshot.params["u_EmailId"];

    this.updateuserpic = new FormGroup({
      u_img: new FormControl(null)
    });
    this._userser.getuserbyemailid(this.u_EmailId).subscribe(
      (data: User[]) => {
        this.formDataBind(data[0]);
        console.log(data[0]);
      }
    );
  }

  formDataBind(item: User) {
    // this.userurl = environment.url + "edit_img/"
    this.userurl = environment.url + "images/UserImages/" + item.u_img;
    console.log(this.userurl);
    this.updateuserpic.patchValue({
      u_img: item.u_img,
    });
  }


  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
    console.log(this.selectedFile);
  }
  onuserimageupdate() {
    let fd = new FormData();
    if (this.selectedFile != null) {
      fd.append('u_img', this.selectedFile, this.selectedFile.name);
      console.log(this.selectedFile.name);
    }
    else {
      fd.append('u_img', this.updateuserpic.get('u_img').value);
      console.log(this.updateuserpic.get('u_img').value);
    }

    this._userser.edituserimage(this.u_EmailId, fd).subscribe(
      (data: User) => {
        console.log(data)

        this._router.navigate(['/userinfo']);
      }
    );

  }
}
