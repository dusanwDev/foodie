import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  registerUserForm: FormGroup;
  errorMessage: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerUserForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  submit() {
    this.authService
      .registerUser(
        this.registerUserForm.get('firstName').value,
        this.registerUserForm.get('lastName').value,
        this.registerUserForm.get('email').value,
        this.registerUserForm.get('password').value,
        this.registerUserForm.get('phone').value,
        this.registerUserForm.get('addres').value
      )
      .subscribe(
        (data) => {},
        (err) => (this.errorMessage = err)
      );
  }
}
