import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDataService } from '../../../app/firebaseData.service';
import { BasketPage } from '../../basket/basket';
 
/**
 * Generated class for the FoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
// @IonicPage()
@Component({
  selector: 'page-drink',
  templateUrl: 'drinks.html',
})
export class DrinksPage implements OnInit {
 
  drinks: any[];
  totalPrice: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private db: FirebaseDataService) {
  }

  ngOnInit(): void {
    this.db.getMenuItems('/drinks').subscribe(result => {
      this.drinks = result;  
      this.drinks.forEach(item =>{
        item['quantity'] = 0;
        item['itemId'] = item.$key;
      })
      this.totalPrice = 0    
    });
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad Drink');
  }

  goToBasket() {
    this.navCtrl.setRoot(BasketPage)       
  }

  AddButton(item: any){
    item['quantity']++;    
    this.setItemToBasket(item);
    this.showTotalPrice();
    console.log(item);
  }

  MinusButton(item:any){
    item['quantity']--;
    this.setItemToBasket(item);
    this.showTotalPrice();
  }

  showTotalPrice(){
    this.totalPrice = 0;
    this.drinks.forEach(item1 => {
      this.totalPrice = this.totalPrice + item1['quantity']*item1.price
    })
  }

  setItemToBasket(item: any) {
    let drinksArr = this.drinks;   
    
    let drinkToEdit = drinksArr.find(ele => {
      return ele.itemId === item.itemId;
    });
    drinkToEdit['quantity'] = item['quantity'];
        
    localStorage.setItem('drinksArr', JSON.stringify(drinksArr));
  }

}
 