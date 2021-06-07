import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild("dialog") dialog : ElementRef
  @ViewChild("selectList") pendingOrders : ElementRef
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
    console.log("DIA",this.dialog)
    // this.renderer.setStyle(this.dialog.nativeElement,"display","flex")

    this.restaurantService.approveOrder(this.restaurant.inOrderProcess,this.restaurant.restaurantId)
    this.dismissOrder(index)
  }
  dismissOrder(index:number){
    this.restaurant.orderedQue.splice(index,1)

    this.restaurantService.removeOrder(this.restaurant.orderedQue,this.restaurant.restaurantId)
  }
  close(dialog : ElementRef){
  this.renderer.setStyle(dialog,"display","none")
  }
  preparingStage(selectListValue ){
switch (selectListValue.value) {

  case "Preparing":
    this.renderer.setStyle(this.pendingOrders.nativeElement,"backgroundColor","red")

    break;
  case "On your way":
    this.renderer.setStyle(this.pendingOrders.nativeElement,"backgroundColor","yellow")

    break;
  case "Delivery":
    this.renderer.setStyle(this.pendingOrders.nativeElement,"backgroundColor","green")

    break;

  default:
    break;
}
  }

}
