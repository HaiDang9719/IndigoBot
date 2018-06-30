import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MenuPage } from '../menu/menu';
import { BasketPage } from '../basket/basket';
import { FirebaseDataService } from '../../app/firebaseData.service';
import { FirebaseAuthService } from '../../app/firebaseAuth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginEmail: string = '';
  loginPassword: string = '';


  constructor(public navCtrl: NavController, private auth: FirebaseAuthService) {
  }

  loginWithFacebook() {
    this.auth.loginWithFacebook().then(result => {
      console.log(result);
    });
  }

  loginWithEmail() {
    this.auth.loginWithEmail(this.loginEmail, this.loginPassword)
    .then(user => {
      this.navCtrl.setRoot(MenuPage);
    })
    .catch(err => {
      alert("View Console Log");
      console.log(err);
    });
  }


  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  } goToMenu(params){
    if (!params) params = {};
    this.navCtrl.push(MenuPage);
  } goToBasket(params){
    if (!params) params = {};
    this.navCtrl.push(BasketPage);
  }
}
