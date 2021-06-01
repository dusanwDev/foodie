import { Restaurant } from "./Restaurant.model";

export class Customer {
  constructor(
    public customerName: string,
    public customerLastName: string,
    public customerId: string,
    public favoriteRestaurants?:Restaurant[],
    public addedToCart?:{
      categoryName: string;
      dishName: string;
      toppings: [string];
      price: number;
      about: string;
      ordered?: number;
      dishId: string;
      image?: string;
      raiting?: number;
    }[]
  ) {}
}
