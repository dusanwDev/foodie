import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.userService.user.next(data['userid'])
    })
  }
  displayMenu(menu){
    if(menu.style.width===''|| menu.style.width==='0px' || menu.style.width==='0%'){
    menu.style.width="100%";
    }
    else{
      menu.style.width="0%"
    }
  }
}
