import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant.model';

@Pipe({
  name: 'restaurantFavorite'
})
export class RestaurantFavoritePipe implements PipeTransform {

  transform( restaurants: Restaurant[],userInput:string): unknown {
    let reg = new RegExp(`^${userInput}`, 'gi');
    console.log("USERINPUT",userInput)
    return userInput
      ? restaurants.filter((item) => {
          return item.restaurantName.match(reg);
        })
      : restaurants;
  }

}
