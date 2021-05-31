export class Restaurant {
  constructor(
    public restaurantName: string,
    public restaurantCity:string,
    public shortAbout:string,
    public restaurantId: string,
    public profit: number,
    public restaurantAddres: string,
    public workTime: string,
    public phone: string,
    public restaurantImage: string,
    public dishes: [
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
    ]
  ) {}
}
