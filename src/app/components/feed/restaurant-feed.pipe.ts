import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant.model';

@Pipe({
  name: 'restaurantFeedPipe'
})
export class RestaurantFeedPipe implements PipeTransform {

  transform(restaurants:Restaurant[], userInput:string) {
    let reg = new RegExp(`^${userInput}`, 'gi');
    console.log("INPUT",userInput)
    return userInput
      ? restaurants.filter((item) => {
          return item.restaurantName.match(reg);
        })
      : [];

  }

}
