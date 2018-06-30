import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDataService } from '../../../app/firebaseData.service';
 
/**
 * Generated class for the FoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
// @IonicPage()
@Component({
  selector: 'page-recommends',
  templateUrl: 'recommends.html'
})
export class RecommendsPage implements OnInit {
 
  listRecommendations: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private db: FirebaseDataService) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodPage');
  }

  ngOnInit(): void {
    this.db.recommendation().subscribe(result => {
      this.listRecommendations = result;
    })
  }


}
 