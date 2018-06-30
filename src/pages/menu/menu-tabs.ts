import { Component } from '@angular/core'; 
import { IonicPage, NavController } from 'ionic-angular'; 
import { DrinksPage } from './drinks/drinks';
import { FoodsPage } from './foods/foods';
import { RecommendsPage } from './recommends/recommends';
 
/** 
 * Generated class for the MenuTabsPage tabs. 
 * 
 * See https://ionicframework.com/docs/components/#navigation for more info on 
 * Ionic pages and navigation. 
 */ 
 
// @IonicPage() 
@Component({ 
  selector: 'menu-tabs', 
  template: `
    <ion-tabs> 
        <ion-tab [root]="foodRoot" tabTitle="Food" ></ion-tab> 
        <ion-tab [root]="drinkRoot" tabTitle="Drink" ></ion-tab> 
        <ion-tab [root]="recommendRoot" tabTitle="Recommendation" ></ion-tab> 
    </ion-tabs>     
  `
}) 
export class MenuTabsPage { 
 
  foodRoot = FoodsPage 
  drinkRoot = DrinksPage 
  recommendRoot = RecommendsPage 
 
  constructor(public navCtrl: NavController) {} 
 
} 