import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseDataService } from '../../app/firebaseData.service';
import { FirebaseAuthService } from '../../app/firebaseAuth.service';
import { HomepagePage } from '../homepage/homepage';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html'
})
export class BasketPage implements OnInit{

  orderItems: any[];
  userInfo: any;
  totalBill = 0;
  deleteItem :any;
  constructor(public navCtrl: NavController, 
    private db: FirebaseDataService, private af:FirebaseAuthService) {

  }
  
  ngOnInit(): void {
    let OrderFoods = JSON.parse(localStorage.getItem('foodsArr'));
    let OrderDrinks = JSON.parse(localStorage.getItem('drinksArr'));
    if (OrderDrinks == undefined) OrderDrinks = [];
    if (OrderFoods == undefined) OrderFoods = [];

    this.orderItems = [...OrderDrinks, ...OrderFoods];  

    this.totalBill = 0;
    this.orderItems = this.orderItems.filter(item => item['quantity'] > 0);

    this.orderItems.forEach(item => {
      if (item['quantity'] > 0) {
        item.isHidden = null;
        item['uniqueId'] = this.db.ramdomId();
        item['totalPrice'] = item.quantity * item.price;
        item['status'] = 'REQUESTED';  
        this.totalBill  = this.totalBill  + item.quantity * item.price;  
      } else {
        item = null;
      }
    });
    
    this.af.getAuthState().subscribe(user => {
      this.userInfo = user;
    })
  }
  
  pushOrder() {
    let totalPrice = 0;
    this.orderItems = this.orderItems.filter(item => item['quantity'] > 0);

    this.orderItems.forEach(item => {
      item.isHidden = null;
      item['uniqueId'] = this.db.ramdomId();
      item['totalPrice'] = item.quantity * item.price;
      item['status'] = 'REQUESTED';  
      totalPrice = totalPrice + item.quantity * item.price;  
    });
    
    let tableInfo = JSON.parse(localStorage.getItem('tableInfo'));

    let orderItem = {
      uid : this.userInfo.uid,
      menu_items: this.orderItems,
      orderStatus: 'REQUESTED',
      owner: {
        name: this.userInfo.displayName ? this.userInfo.displayName : "Nguyen Van A",
        uid: this.userInfo.uid
      },
      tableInfo: tableInfo,
      totalPrice: totalPrice,
      updatedAt: this.db.getTimestamp()
    }
    
    this.db.pushOrder(orderItem).then(result => {
      // 1. Remove list
      localStorage.removeItem('drinksArr');
      localStorage.removeItem('foodsArr');      
      
      // 2. Update table Status
      this.db.changeStatusOfTable(tableInfo.name, 'USED');
      
      alert("Order success")      
      this.navCtrl.setRoot(MyApp)
    });
  }
  
  deleteOrderItem(item:any)
  {
    console.log(item);
    console.log(this.orderItems);
    this.orderItems = this.orderItems.filter(function(obj) { 
      return obj !== item
  })
  }
  
}
