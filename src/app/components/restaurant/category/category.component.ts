import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute
  ) {}
  dishes = [];
  cateogryName: string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.cateogryName = data['categoryName'].charAt(0).toUpperCase() +  data['categoryName'].slice(1);;
      this.restaurantService.restaurantBehSubject.subscribe((restaurant) => {
        console.log(restaurant.dishes);
        console.log(data['categoryName'])

        this.dishes =restaurant.dishes.filter(
                (dish) =>  dish.categoryName === data['categoryName']
              )
              if(this.dishes.length===0){
                this.dishes =restaurant.dishes
              }
        // this.dishes = data['categoryName'] ? restaurant.dishes.filter(
        //       (dish) =>  dish.categoryName === data['categoryName']
        //     )
        //   : restaurant.dishes;
          console.log(this.dishes)
      });
    });
  }
  sortFoodBy(event) {
    console.log(event);
    switch (event) {
      case 'raiting':
        this.dishes = this.dishes.sort((a, b) => {
          return b.raiting - a.raiting;
        });
        break;
      // case 'fastest':this.restaurant.dishes.sort((a,b)=>{

      // })
      //   break;
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

      default:
        break;
    }
  }
  revealOrder(orderItem) {
    if (orderItem.style.height === '' || orderItem.style.height == '0px') {
      orderItem.style.height = 'auto';
    } else {
      orderItem.style.height = '0px';
    }
  }
}
