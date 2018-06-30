import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { FirebaseDataService } from '../../app/firebaseData.service';
import { FirebaseAuthService } from '../../app/firebaseAuth.service';
@Component({
  selector: 'page-cash',
  templateUrl: 'cash.html'
})
export class CashPage implements OnInit {
  totalPrice: number;
  Amount : number;
  userInfo: any;
  ngOnInit(): void {
    this.totalPrice =  parseInt(localStorage.getItem('totalPrice') );
    this.af.getAuthState().subscribe(user => {
      this.userInfo = user;
      console.log(this.userInfo)
    })
    
  }
  constructor(public navCtrl: NavController,private db: FirebaseDataService, private af:FirebaseAuthService) {
    
  }

  pushRequest()
  {
    let tableInfo = JSON.parse(localStorage.getItem('tableInfo'));
     let paymentRequest = {
      moneyChanged : this.Amount - this.totalPrice,
      orderId: localStorage.getItem('randomID'),
      ownerInfo: this.userInfo.displayName,
      paymentMethod: "CASH",
      status: "REQUESTED",
      tableName: tableInfo.name,
      totalBill: this.totalPrice,
      updatedAt: this.db.getTimestamp()
    }
    this.db.pushPaymentRequest(paymentRequest).then(resul => {
      this.db.changeStatusOfTable(tableInfo.name, 'EMPTY');
      localStorage.removeItem('randomID');
    })

  }
  Pay(params)
  {
    if (!params) params = {};
    console.log(this.Amount)
    if(this.Amount== undefined)
    {
      alert("You have to input value to add Amount") 
      return;
    }
    if(this.Amount < this.totalPrice)
    {
      alert("Your amount is not enough to the total price") 
      return;
    }
    alert("Request payment successfully")
    this.navCtrl.setRoot(MenuPage)
    this.pushRequest()
    
  }


  
}
