import { Restaurant } from "./Restaurant.model";

export class Customer {
  constructor(
    public customerName: string,
    public customerLastName: string,
    public customerId: string,
    public customerAddres:string,
    public customerPhone:number,
    public favoriteRestaurants?:Restaurant[],
    public ratedRestaurants?:{restaurantId:string,raiting:string}[],
    public addedToCart?:{
      categoryName: string;
      dishName: string;
      toppings: [string];
      price: number;
      about: string;
      orderProgress:string,
      ordered?: number;
      dishId: string;
      image?: string;
      raiting?: number;
    }[]
  ) {}
}
