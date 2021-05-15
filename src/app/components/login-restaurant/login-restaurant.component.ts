import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-restaurant',
  templateUrl: './login-restaurant.component.html',
  styleUrls: ['./login-restaurant.component.scss'],
})
export class LoginRestaurantComponent implements OnInit {
  logInRestaurant: FormGroup;
  erorMessage: string;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.logInRestaurant = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  submit() {
    this.authService
      .login(
        this.logInRestaurant.get('email').value,
        this.logInRestaurant.get('password').value,
        'loginRestaurant'
      )
      .subscribe(
        (data) => console.log(data),
        (err) => (this.erorMessage = err)
      );
  }
}
