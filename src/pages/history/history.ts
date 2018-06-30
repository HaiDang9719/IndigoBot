import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseDataService } from '../../app/firebaseData.service';
import { FirebaseAuthService } from '../../app/firebaseAuth.service';
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage implements OnInit, AfterViewInit{
  paidItemList : any[]
  ngAfterViewInit(): void {
    // this.db.getOrdersByUID(this.userInfo.uid).subscribe(result1=>{
    //   console.log(result1)
    // })
  }
 userInfo : any;
  ngOnInit(): void {
    this.af.getAuthState().subscribe(user=>{
      this.userInfo = user;
      console.log(user.uid)
      this.db.getOrdersByUID(user.uid).subscribe(result1=>{
        this.paidItemList = result1.filter(item => {
          return item.orderStatus == "PAID"
        })
        console.log(this.paidItemList)
        this.paidItemList.forEach(item => {
          item['dateTime'] = new Date(item.updatedAt);
        })
        this.paidItemList.sort((a ,b): number => {
          if (a.updatedAt >= b.updatedAt) 
            return -1; 
          else return 1;        
        });
        console.log(this.paidItemList)
        
      })
    })
  }

  constructor(public navCtrl: NavController,private db: FirebaseDataService, private af:FirebaseAuthService) {
  }
  
}
