import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayMenu(menu){
    console.log(menu);
if(menu.style.width===''|| menu.style.width==='0px' || menu.style.width==='0%'){
  menu.style.width="100%";
}
else{
  menu.style.width="0%"
}
  }
}
