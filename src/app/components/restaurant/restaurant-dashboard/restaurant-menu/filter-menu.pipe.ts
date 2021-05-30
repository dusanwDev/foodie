import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMenu',
})
export class FilterMenuPipe implements PipeTransform {
  transform(
    dishes: [
      {
        categoryName: string;
        dishName: string;
        toppings: [string];
        price: number;
        about: string;
        ordered?: number;
        dishId: string;
        image?: string;
        raiting?: number;
      }
    ],
    value: string
  ) {
    // If there's a value passed (male or female) it will filter the list otherwise it will return the original unfiltered list.
    let reg = new RegExp(`^${value}`, 'gi');
    return value
      ? dishes.filter((item) => {
          return item.dishName.match(reg);
        })
      : dishes;
  }
}
