import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer.model';
import { Utility } from 'src/app/models/Utility.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
updateProfile:FormGroup
  constructor(private userService: UserService,private afs:AngularFirestore) { }
customer:Customer;
  ngOnInit(): void {
    this.userService.user.subscribe(userId=>{

      this.afs.collection<Customer>(Utility.firestoreName).doc(userId).valueChanges().subscribe(userData=>this.customer = userData)
    })
    this.updateProfile = new FormGroup({
      name:new FormControl(null,Validators.required),
      lastname:new FormControl(null,Validators.required),
      addres:new FormControl(null,Validators.required),
      phone:new FormControl(null,Validators.required),
    })
    
  }
  submit(){
  this.userService.updateCustomerProfile({name:this.updateProfile.get("name").value,lastName:this.updateProfile.get("lastname").value,addres:this.updateProfile.get("addres").value,phone:this.updateProfile.get("phone").value})
  }
}
