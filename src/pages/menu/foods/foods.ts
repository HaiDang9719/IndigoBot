import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
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
  selector: 'page-food',
  templateUrl: 'foods.html',
})
export class FoodsPage implements OnInit {
  
  foods: any[];
  totalPrice:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: FirebaseDataService) {

  }
 
  ngOnInit(): void {
    this.db.getMenuItems('/foods').subscribe(result => {
      this.foods = result; 
      this.foods.forEach(item => {
        item['quantity'] = 0;
        item['itemId'] = item.$key;
      })
      
      
    });
    this.totalPrice = 0
  }

  goToBasket() {
      this.navCtrl.setRoot(BasketPage)
      //localStorage.setItem('foodsArr', JSON.stringify(this.foods));     
  }
  AddButton(item: any){
    item['quantity']++;
    this.setItemToBasket(item);
    this.showTotalPrice()    
    
  }
  MinusButton(item:any){
    item['quantity']--;
    this.setItemToBasket(item);
    this.showTotalPrice()
  }

  showTotalPrice(){
    this.totalPrice = 0;
    this.foods.forEach(item1=>{
      this.totalPrice = this.totalPrice + item1['quantity']*item1.price
    })
  }

  setItemToBasket(item: any) {
    let foodsArr = this.foods;
    
    let element = foodsArr.find(ele => {      
      return ele['itemId'] == item['itemId'];
    });

    element['quantity'] = item['quantity'];
            
    localStorage.setItem('foodsArr', JSON.stringify(foodsArr));
  }

  
}
 