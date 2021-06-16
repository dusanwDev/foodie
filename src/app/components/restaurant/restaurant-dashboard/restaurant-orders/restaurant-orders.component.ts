import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { UserService } from 'src/app/components/user-profile/user.service';
import { Restaurant } from 'src/app/models/Restaurant.model';
import { RestaurantService } from '../../restaurant.service';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.scss']
})
export class RestaurantOrdersComponent implements OnInit {

  constructor(private renderer:Renderer2,private restaurantService : RestaurantService,private userService : UserService) { }
  restaurant:Restaurant
  @ViewChild("dialog") dialog : ElementRef
  @ViewChildren ("selectList") pendingOrders : QueryList<ElementRef>
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
    this.dismissOrder(index)
  }
  dismissOrder(index:number){
    this.restaurant.orderedQue.splice(index,1)

    this.restaurantService.removeOrder(this.restaurant.orderedQue,this.restaurant.restaurantId)
  }
  close(dialog : ElementRef){
  this.renderer.setStyle(dialog,"display","none")
  }
  preparingStage(selectListValue,inOrderProcessDish,index ){
    inOrderProcessDish.orderProcess=selectListValue.value
    this.userService.updateOrderStatus(inOrderProcessDish)
    switch (selectListValue.value) {
    case "Preparing":
      this.renderer.setStyle(this.pendingOrders.toArray()[index].nativeElement,"backgroundColor","red")
      break;
    case "Delivery":
      this.renderer.setStyle(this.pendingOrders.toArray()[index].nativeElement,"backgroundColor","yellow")
      break;
    case "Delivered":
      this.renderer.setStyle(this.pendingOrders.toArray()[index].nativeElement,"backgroundColor","green")
      this.restaurant.inOrderProcess.splice(index,1)
      this.restaurantService.removeFromInOrderProcess(this.restaurant.inOrderProcess,this.restaurant.restaurantId)
      break;

    default:
      break;
      }
    }




}
