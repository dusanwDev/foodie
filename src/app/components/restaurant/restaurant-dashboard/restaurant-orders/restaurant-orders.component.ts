import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.scss']
})
export class RestaurantOrdersComponent implements OnInit {

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
  }
  displayDishDialog(dialog : ElementRef){
    this.renderer.setStyle(dialog,"display","flex")

  }
  approveOrder(){

  }
  dismissOrder(){

  }
  close(dialog : ElementRef){
this.renderer.setStyle(dialog,"display","none")
  }

}
