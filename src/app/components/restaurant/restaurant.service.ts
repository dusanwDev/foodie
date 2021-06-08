import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Customer } from 'src/app/models/Customer.model';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  restaurantBehSubject = new BehaviorSubject<Restaurant>(null);
orderStage = new BehaviorSubject<string>(null)

  constructor(private afs : AngularFirestore) {}

  raitings(raiting:string,restaurant:Restaurant){
    this.afs.collection<Restaurant>(Utility.firestoreName).doc(restaurant.restaurantId).update({

    })
  }
  addToOrderQue(orderedQue,restaurantId:string){
    console.log("QQ",orderedQue)
  this.afs.collection<Restaurant>(Utility.firestoreName).doc(restaurantId).update({
    orderedQue:orderedQue
  })
  }
  approveOrder(inOrderProcess,restaurantId:string){
  this.afs.collection<Restaurant>(Utility.firestoreName).doc(restaurantId).update({
    inOrderProcess:inOrderProcess
  })
  }
  removeOrder(orderQue,restaurantId:string){
    this.afs.collection<Restaurant>(Utility.firestoreName).doc(restaurantId).update({
      orderedQue:orderQue
    })
  }
  removeFromInOrderProcess(inOrderProcess,restaurantId:string){
    this.afs.collection<Restaurant>(Utility.firestoreName).doc(restaurantId).update({
      inOrderProcess:inOrderProcess
    })
  }
}
