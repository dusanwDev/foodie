import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss'],
})
export class RegisterRestaurantComponent implements OnInit {
  registerRestaurant: FormGroup;
  errorMessage: string;
  constructor(private authService: AuthService) {
    this.registerRestaurant = new FormGroup({
      restaurantName: new FormControl(null, Validators.required),
      restaurantEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      restaurantPassword: new FormControl(
        null,
        Validators.required
      ),
    });
  }
  submit() {
    this.authService
      .registerRestaurant(
        this.registerRestaurant.get('restaurantName').value,
        this.registerRestaurant.get('restaurantEmail').value,
        this.registerRestaurant.get('restaurantPassword').value
      )
      .subscribe(
        (data) => {},
        (err) => {
          this.errorMessage = err;
        }
      );
  }
  passwordValidator(passwordValue: FormControl): { [key: string]: boolean } {
    let valid = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/.test(
      passwordValue.value
    );
    if (valid) {
      return null;
    }
    return { passwordError: true };
  }
  ngOnInit(): void {}
}
