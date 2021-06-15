import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantResolver implements Resolve<Restaurant> {
  constructor(private restaurantService:RestaurantService){
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Restaurant> {

    return this.restaurantService.getRestaurant(route.paramMap.get("restaurantId"))
  }
}
