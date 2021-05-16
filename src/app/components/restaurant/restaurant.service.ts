import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from 'src/app/models/Restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  restaurantBehSubject = new BehaviorSubject<Restaurant>(null);
  constructor() {}
}
