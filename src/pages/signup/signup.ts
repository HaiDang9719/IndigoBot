import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuthService } from '../../app/firebaseAuth.service';
import { FirebaseDataService } from '../../app/firebaseData.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit  {

  account: any = {};

  @Input() userAccount: any = undefined;

  constructor(public navCtrl: NavController, private auth: FirebaseAuthService,
    private db: FirebaseDataService) {

  }

  ngOnInit(): void {
    if (this.userAccount != undefined) {
      this.account = this.userAccount;
    }
  }

  registerAccount() {
    this.auth.registerAccount(this.account).then(user => {
      this.account.uid = user.uid;
      this.account.password = null;
      this.auth.pushUserInfo(this.account).then(() => {
        alert("Account is created");
      });
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }

  updateAccountInfo() {
    
  }
}
