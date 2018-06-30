import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuthService } from '../../app/firebaseAuth.service';
import { FirebaseDataService } from '../../app/firebaseData.service';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})
export class HomepagePage implements OnInit, AfterViewInit {

  user: any;
  username : any;
  photoURL: any;
  available_Table: any[];
  num: any
  constructor(public navCtrl: NavController,
    private auth: FirebaseAuthService,
    private db: FirebaseDataService
  ) {

  }
  
  ngOnInit(): void {
    this.auth.getAuthState().subscribe(user => {
      this.user =  user;
      this.username = user.displayName;
      this.photoURL = user.photoURL;
      
    });
    this.db.getTables().subscribe(table=>{
      this.available_Table = table.filter(item=>{
        return item.currentStatus == "EMPTY"
      })
    this.num = this.available_Table.length;
    })

  }

  orderClick()
  {
    this.navCtrl.push(MenuPage)
  }
  
  logout() {
    this.auth.logout().then(result => {
      this.navCtrl.setRoot(LoginPage);
    });

  }

  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }

}
