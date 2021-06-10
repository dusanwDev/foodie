import { Customer } from "./Customer.model";

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
    public  workTimeFrom:string,
    public workTimeTo:string,
    public workTimeDaysFrom:string,
    public workTimeDaysTo:string,
    public restaurantRaiting:number[],
    public restaurantDisplayRaiting:number,
    public deliveryPrice:number,
    public dishes:{
      dishId: string;
      categoryName: string;
      dishName: string;
      toppings: [string];
      price: number;
      about: string;
      raitingToDisplay?:number,
      ordered?: number;
      image?: string;
      raiting?: number[];restaurantId:string
    }[],
    public orderedQue:{
      dishName: string;
      price: number;
      customerName:string;
      customerAddres:string;
      customerLastname:string;
      dishId:number;dishImage:string;restaurantId:string
    }[],
    public inOrderProcess:{
      dishName: string;
      price: number;
      customerName:string;
      customerAddres:string;
      customerLastname:string,dishId:number
      orderProcess:string;dishImage:string;restaurantId:string
    }[]  
  ) {}
}
