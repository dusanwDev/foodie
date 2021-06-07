import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { RestaurantService } from '../../restaurant.service';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.scss']
})
export class RestaurantOrdersComponent implements OnInit {

  constructor(private renderer:Renderer2,private restaurantService : RestaurantService) { }
  restaurant:Restaurant
  ngOnInit(): void {
    this.restaurantService.restaurantBehSubject.subscribe(res=>this.restaurant = res)
  }
  displayDishDialog(dialog : ElementRef){
    this.renderer.setStyle(dialog,"display","flex")

  }
  approveOrder(ordered,index:number){
    if(typeof this.restaurant.inOrderProcess === "undefined"){
      this.restaurant.inOrderProcess = []
    }
    this.restaurant.inOrderProcess.push(ordered)
    this.restaurantService.approveOrder(this.restaurant.inOrderProcess,this.restaurant.restaurantId)
    this.restaurant.orderedQue.splice(index,1)
    this.restaurantService.removeOrder(this.restaurant.orderedQue,this.restaurant.restaurantId)
  }
  dismissOrder(){

  }
  close(dialog : ElementRef){
  this.renderer.setStyle(dialog,"display","none")
  }

}
