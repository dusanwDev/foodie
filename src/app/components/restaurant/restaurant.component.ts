import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  restaurant: Restaurant;
  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,
    private angularFIrestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((dataId) => {
      this.angularFIrestore
        .collection<Restaurant>(Utility.firestoreName)
        .doc(dataId['restaurantId'])
        .valueChanges()
        .subscribe((data) => {
          this.restaurant = data;
          console.log('RES', this.restaurant);
        });
    });
  }
}
