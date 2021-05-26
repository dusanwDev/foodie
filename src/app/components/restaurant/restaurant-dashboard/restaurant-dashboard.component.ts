import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { Utility } from 'src/app/models/Utility.model';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss'],
})
export class RestaurantDashboardComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}
  restaurant: Restaurant;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.afs
        .collection<Restaurant>(Utility.firestoreName)
        .doc(data['restaurantIdDashboard'])
        .valueChanges()
        .subscribe((restaurantData) => {
          this.restaurant = restaurantData;
          this.restaurantService.restaurantBehSubject.next(this.restaurant);
        });
    });
  }
}
