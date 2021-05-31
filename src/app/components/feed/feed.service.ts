import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
    constructor(private afs:AngularFirestore) {}
    getRestaurants(){
     return   this.afs.collection<Restaurant>(Utility.firestoreName,(ref=>ref.where("restaurantId","!=","undefined"))).valueChanges()
    }
}
