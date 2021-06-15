import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant.model';

@Pipe({
  name: 'feedPipe'
})
export class FeedPipePipe implements PipeTransform {

  transform(restaurants: Restaurant[], formValue:{city:string,raiting:number,type:string}) {
   console.log(restaurants)
    return formValue.city
    ? restaurants.filter((item) => {
        if(item.restaurantCity === formValue.city || item.restaurantDisplayRaiting === +formValue.raiting||item.restaurantType===formValue.type){
          console.log("FOUND",item)
          return item
        }
      })
    : restaurants;
  
  
  }

}
