import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userOrders'
})
export class UserOrdersPipe implements PipeTransform {

  transform(orders:{    dishId: string;
    categoryName: string;
    dishName: string;
    toppings: [string];
    price: number;
    about: string;
  restaurantId:string}[],userInput:string): unknown {
    let reg = new RegExp(`^${userInput}`, 'gi');
    return userInput
      ? orders.filter((item) => {
          return item.dishName.match(reg);
        })
      : orders;
  }

}
