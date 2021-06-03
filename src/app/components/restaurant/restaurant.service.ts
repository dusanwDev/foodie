import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  restaurantBehSubject = new BehaviorSubject<Restaurant>(null);
  constructor(private afs : AngularFirestore) {}

  raitings(raiting:string,restaurant:Restaurant){
    this.afs.collection<Restaurant>(Utility.firestoreName).doc(restaurant.restaurantId).update({

    })
  }
}
