import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CashPage } from '../cash/cash';
import { MenuPage } from '../menu/menu';
import { FirebaseDataService } from '../../app/firebaseData.service';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})

export class PaymentPage implements OnInit{
  orderList: any[];
  paymentMethod: string;
  totalPrice :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: FirebaseDataService) {
      this.paymentMethod = 'CASH';
  }
  
  ngOnInit(): void {
    let orderID = localStorage.getItem('randomID');
    if(orderID == undefined){
      alert("you have not ordered")
      this.navCtrl.setRoot(MenuPage);
      return;
    } 
    this.db.getOrdersByOrderID(orderID).subscribe(result1 =>{
        this.totalPrice = result1.totalPrice;
        this.orderList = result1.menu_items
        console.log(this.orderList)
        result1.menu_items.forEach(result3 => {
          result3['totalPriceForEachItem'] = result3.price * result3.quantity;
          console.log(result3['name'])
        })
      })      
  };

  getPaymentMethod() {
    return this.paymentMethod;
  }

  ProcessPayment(){
    localStorage.setItem("totalPrice", this.totalPrice + '');
    let tableInfo = JSON.parse(localStorage.getItem('tableInfo'));

    let method = this.getPaymentMethod();

    if (method == "CASH")
    {
      this.navCtrl.setRoot(CashPage);
    }    
    else 
    {
      localStorage.removeItem('randomID');
      this.db.changeStatusOfTable(tableInfo.name, 'EMPTY');
      // Update to Overview       
      // Update to Order PAID
      this.db.paymentPaid(method);

      alert("Payment Success")
      this.navCtrl.setRoot(MenuPage)
    }  
   }
}
