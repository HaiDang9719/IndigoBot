import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomepagePage } from '../pages/homepage/homepage';
import { MenuPage } from '../pages/menu/menu';
import { HistoryPage } from '../pages/history/history';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { BasketPage } from '../pages/basket/basket';
import { PaymentPage } from '../pages/payment/payment';
import { CashPage } from '../pages/cash/cash';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FoodsPage } from '../pages/menu/foods/foods';
import { MenuTabsPage } from '../pages/menu/menu-tabs';
import { DrinksPage } from '../pages/menu/drinks/drinks';
import { RecommendsPage } from '../pages/menu/recommends/recommends';
import { FirebaseDataService } from './firebaseData.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseAuthService } from './firebaseAuth.service';
import { BlankPage } from '../pages/blank-page/blank-page';
import { HttpClientModule } from '@angular/common/http';


const MenuComponents = [
  MenuTabsPage,
  FoodsPage,
  DrinksPage,
  RecommendsPage
]

const MainPageComponents = [
  HomepagePage,
  MenuPage,
  HistoryPage,
  LoginPage,
  SignupPage,
  BasketPage,
  PaymentPage,
  CashPage,
  BlankPage
]

const firebaseConfig = {
  apiKey: 'AIzaSyAkeRfGHGo3eBBgNwsOYX-WSrkxLENmDjU',
  authDomain: 'instserve.firebaseapp.com',
  databaseURL: 'https://instserve.firebaseio.com',
  projectId: 'instserve',
  storageBucket: 'instserve.appspot.com',
  messagingSenderId: '569011858745'
};


@NgModule({
  declarations: [
    MyApp,
    ...MainPageComponents,
    ...MenuComponents
  ],
  imports: [
    BrowserModule,
    
    AngularFireModule.initializeApp(firebaseConfig, 'InstServe'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement:'top'    
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...MainPageComponents,
    ...MenuComponents
  ],
  providers: [
    FirebaseDataService,
    FirebaseAuthService,
    StatusBar,
    SplashScreen,   
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}