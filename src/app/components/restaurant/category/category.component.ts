import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { UserService } from '../../user-profile/user.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,private userService:UserService,private renderer:Renderer2
  ) {}
  dishes :{dishId: string; categoryName: string; dishName: string; toppings: [string]; price: number; about: string; restaurantId:string;ordered?: number;image?: string;raiting?:number[];raitingToDisplay?:number}[]= [];
  cateogryName: string;
  restaurantId:string;
  displayRestaurantFeaturesBool:boolean;
  total = 0
  restaurant:Restaurant
  @ViewChildren('topping') toppings:QueryList<ElementRef>;
  @ViewChildren('orderItem') orderItem:QueryList<ElementRef>;
  @ViewChild("addToCartAllert") addToCartAllert : ElementRef;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.cateogryName = data['categoryName'].charAt(0).toUpperCase() +  data['categoryName'].slice(1);;
      this.restaurantService.restaurantBehSubject.subscribe((restaurant) => {
        this.restaurantId = restaurant.restaurantId;
        this.displayRestaurantFeatures();
        this.restaurant = restaurant
        this.dishes = restaurant.dishes.filter((dish) =>  dish.categoryName === data['categoryName']) 
        if(this.dishes.length===0){
          this.dishes =restaurant.dishes
        }
        this.dishes.map(dish=>{
          if(typeof dish.raiting !== "undefined"){
          dish.raitingToDisplay = dish.raiting?.reduce((acc,curr)=>acc+curr,0) / dish.raiting.length
          console.log("To Display",dish.raitingToDisplay)
          }
        })
      });
    });
  }
  sortFoodBy(event) {
    switch (event) {

      case 'lowestprice':
        this.dishes = this.dishes.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case 'highestprice':
        this.dishes = this.dishes.sort((a, b) => {
          return b.price - a.price;
        });
        break;
      case 'lowestRaiting':
        this.dishes = this.dishes.sort((a, b) => {
          return a.raitingToDisplay - b.raitingToDisplay;
        });
        break;
      case 'highestRaiting':
        this.dishes = this.dishes.sort((a, b) => {
          return b.raitingToDisplay - a.raitingToDisplay;
        });
        break;
      
      default:
        break;
    }
  }
  revealOrder(orderItem) {
    if (orderItem.style.height === '' || orderItem.style.height == '0px') {
      orderItem.style.height = 'auto';
      orderItem.scrollIntoView(true)
    } else {
      orderItem.style.height = '0px';
    }
  }
  displayRestaurantFeatures() {
    const obj: {
      email: string;
      expDate: string;
      localId: string;
      refreshToken: string;
      tokenId: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (this.restaurantId === obj.localId) {
      this.displayRestaurantFeaturesBool = false;
    } else {
      this.displayRestaurantFeaturesBool = true;
    }
  }

  addToOrder(dish){
    this.userService.addToCart(dish);
    this.renderer.setStyle(this.addToCartAllert.nativeElement,"display","inline")
    setTimeout(() => {
      this.renderer.setStyle(this.addToCartAllert.nativeElement,"display","none")
    }, 4000);
    this.calculateTotal();
    this.pushToOrderQue(dish)

  }
  

  calculateTotal(){
    this.userService.calculateTotal().subscribe(total=>this.total=total );
  }
  pushToOrderQue(dish){
    this.userService.customerBehSubject.pipe(take(1)).subscribe(customer=>{
      if(typeof this.restaurant.orderedQue === "undefined"){
        this.restaurant.orderedQue = [];
      }
      this.restaurant.orderedQue.push({customerName:customer.customerName,customerLastname:customer.customerLastName,customerAddres:customer.customerAddres,dishName:dish.dishName,price:dish.price,dishId:dish.dishId,image:dish.image,restaurantId:this.restaurant.restaurantId,phone:customer.customerPhone,categoryName:dish.categoryName})
      console.log("ESKETIT",this.restaurant.orderedQue)
      this.restaurantService.addToOrderQue(this.restaurant.orderedQue,this.restaurantId);
    })
  }
}


