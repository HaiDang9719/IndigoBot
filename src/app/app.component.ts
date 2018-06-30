import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuPage } from '../pages/menu/menu';
import { BasketPage } from '../pages/basket/basket';
import { HistoryPage } from '../pages/history/history';

import { HomepagePage } from '../pages/homepage/homepage';
import { LoginPage } from '../pages/login/login';
import { FirebaseAuthService } from './firebaseAuth.service';
import { PaymentPage } from '../pages/payment/payment';

import { NavController } from 'ionic-angular';
import { BlankPage } from '../pages/blank-page/blank-page';

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query variable %s not found', variable);
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements AfterViewInit {
  @ViewChild(Nav) navChild:Nav;
  Username: String;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private auth: FirebaseAuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });    
  }

  logout() {
    this.auth.logout();
  }

  ngAfterViewInit(): void {
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.Username = user.displayName;

        let tableName = getQueryVariable('tableName');
        let type = getQueryVariable('type');

        localStorage.setItem('tableInfo', JSON.stringify({
          //id: '01', 
          name: tableName
        }));

        if (type == 'order') {
          this.navCtrl.setRoot(MenuPage);
        };
        if (type == 'payment') {
          this.navCtrl.setRoot(PaymentPage);
        }
        
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
      
    });          
  };
  

  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = BlankPage;

  goToHomepage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomepagePage);
  }goToMenu(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MenuPage);
  }goToBasket(params){
    if (!params) params = {};
    this.navCtrl.setRoot(BasketPage);
  }goToHistory(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HistoryPage);
  }goToPayment(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PaymentPage);
  }


}
