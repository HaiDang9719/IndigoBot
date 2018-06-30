import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';
function RamdomId() {
  return Math.random().toString(36).substr(2, 15).toUpperCase();
}

@Injectable()
export class FirebaseDataService {

  // Link Reference: https://github.com/mosh-hamedani/organic-shop/tree/master/src/app/shared/services

  constructor(private db: AngularFireDatabase, private af: AngularFireAuth, public httpClient: HttpClient) { }

  getMenuItems(type: string) {
    return this.db.list('/menus' + type);    
  }

  getTimestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  getTables() {
    return this.db.list('/tables');    
  }
  
  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUID(UID: string)
  {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'uid',
        equalTo: UID
      }
    });
  }

  getOrdersByOrderID(OrderID: string)
  {
    return this.db.object('/orders/'+ OrderID)    
  }

  pushOrder(order: any): Promise<any> {
    let randomID = localStorage.getItem('randomID');

    if(randomID == undefined || randomID == null) {
      randomID = RamdomId();
      localStorage.setItem('randomID', randomID);
      this.db.object('/orders/' + randomID).update(order);
      return new Promise(resolve => resolve(order));
    }
    else
    {
      let onlOrder = this.db.object('/orders/' + randomID);
      return new Promise(resolve => {
        onlOrder.take(1).subscribe(result => {
          result['menu_items'] = [...result['menu_items'], ...order['menu_items']];
          result['updatedAt'] = this.getTimestamp(); 
          result['orderStatus'] = 'REQUESTED';
          result['totalPrice'] = result['totalPrice'] + order['totalPrice'];
          onlOrder.update(result);
          resolve(result);        
        })  
      })
    }       
  }

  pushPaymentRequest(req: any) {
    let randomID = RamdomId();    
    return this.db.object('/paymentRequests/' + randomID).update(req);
  }
  
  getMachineLearningDrinks() {
    return this.httpClient.post(
      'https://ussouthcentral.services.azureml.net/workspaces/8fc28cb599364038a1879354f6aee8ab/services/32b7901f941f409d883ea0afd7742186/execute?api-version=2.0&format=swagger', 
      {
        "Inputs": {
                "input1":
                [
                    {
                            "orderID": "",   
                            "drinkID": "15",   
                            "ratings": "2" 
                   }
                ]
        },
        "GlobalParameters":  {
        }
    },
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer NSn5ZXDEu5oRtsRr4rfWYl6vqjodzZIZm7vu1r4F3V4vBoRLQoF/V+ZeztYA23mhtojmIIBNAx2/kgtIw3WqIw==' }
    });
  }

  getMachineLearningFoods() {
    return this.httpClient.post(
      'https://ussouthcentral.services.azureml.net/workspaces/8fc28cb599364038a1879354f6aee8ab/services/31597c1aceff49f0b653db7f8fb2dea0/execute?api-version=2.0&format=swagger', 
      {
        "Inputs": {
                "input1":
                [
                    {
                            "orderID": "",   
                            "foodID": "100",   
                            "ratings": "2" 
                   }
                ]
        },
        "GlobalParameters":  {
        }
    },
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer NSn5ZXDEu5oRtsRr4rfWYl6vqjodzZIZm7vu1r4F3V4vBoRLQoF/V+ZeztYA23mhtojmIIBNAx2/kgtIw3WqIw==' }
    });
  }
  
  ramdomId(): string {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  }

  changeStatusOfTable(tableName: string, status: string) {
    let sub = this.db.list('/tables', {
      query: {
        orderByChild: 'name',
        equalTo: tableName
      }
    }).subscribe(result => {      
      result.forEach(item => {        
        this.db.object('/tables/' + item['$key']).update({currentStatus: status});
      });
      sub.unsubscribe();
    });
  }

  paymentPaid(type: string) {
    let orderId = localStorage.getItem('randomID');
    this.db.object('/orders/' + orderId).update({orderStatus: 'PAID'});

    let item = this.db.object('/overview/paymentMethods/' + type);
    item.take(1).subscribe(result => {      
      item.update({quantity: result.quantity + 1});
    })
  }

  recommendation(): Observable<any[]> {
    let mlDrinks = [1,5,9];
    let mlFoods = [2,4,6];

    let listFoods = [];
    let listDrinks = [];

    return new Observable(observer => {
      this.db.object('/menus').take(1).subscribe(result => {      
        for (let index = 0; index < result.drinks.length; index++) {
          const element = result.drinks[index];
          if (mlDrinks.indexOf(index) > 0) {
            listDrinks.push(element);
          }
        }
        for (let index = 0; index < result.foods.length; index++) {
          const element = result.foods[index];
          if (mlFoods.indexOf(index) > 0) {
            listFoods.push(element);
          }
        }
        observer.next([...listDrinks, ...listFoods]);
      });      
    })
  }
}
