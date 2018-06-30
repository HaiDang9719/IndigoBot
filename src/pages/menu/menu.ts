import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar } from 'ionic-angular';
import { BasketPage } from '../basket/basket';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodPage');
      this.navBar.backButtonClick = (e:UIEvent)=>{
        localStorage.removeItem('drinksArr');
        localStorage.removeItem('foodsArr');
       this.navCtrl.pop();
      }
    
  }
  goToBasket() {    
    let OrderFoods = JSON.parse(localStorage.getItem('foodsArr'));
    let OrderDrinks = JSON.parse(localStorage.getItem('drinksArr'));

    if (OrderDrinks == undefined && OrderFoods == undefined) {
      alert("No items in basket");
    } else {
      this.navCtrl.setRoot(BasketPage);
    }    
  }
}
