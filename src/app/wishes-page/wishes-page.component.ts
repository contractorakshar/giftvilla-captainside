import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WishToFriendService } from '../wish-to-friend.service';

@Component({
  selector: 'app-wishes-page',
  templateUrl: './wishes-page.component.html',
  styleUrls: ['./wishes-page.component.css']
})
export class WishesPageComponent implements OnInit {
  em: string;

  WishDetailsForm: FormGroup;
  constructor(private wishServiceObj: WishToFriendService) { }

  ngOnInit(): void {


    this.WishDetailsForm = new FormGroup({
      fk_u_EmailId: new FormControl(null),
      friends_email: new FormControl(null),
      friends_dob: new FormControl(null)
    });
    this.em = localStorage.getItem('u_EmailId');
    if (this.em == '') {
      this.em = '';
    }
    else {
      this.em = localStorage.getItem('u_EmailId');
    }

  }
  onSubmitMessage() {

    let fb = {
      fk_u_EmailId: this.WishDetailsForm.get('fk_u_EmailId').value,
      friends_email: this.WishDetailsForm.get('friends_email').value,
      friends_dob: this.WishDetailsForm.get('friends_dob').value,
    };
    this.wishServiceObj.AddWishDetails(fb).subscribe(
      (dataDetails: any[]) => {
        console.log(dataDetails);
      }

    );

  }


}
