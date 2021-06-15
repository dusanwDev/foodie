import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  title = 'restaurant-app';
  loading=true
  constructor(    
    private router:Router
    ){
      this.router.events.subscribe((routerEvent:Event)=>{
        this.checkRouterEvent(routerEvent)
    })
    }

    checkRouterEvent(routerEvent:Event){
      if(routerEvent instanceof NavigationStart){
        this.loading = true
      }
      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError){
        this.loading = false

      }
    }
}
