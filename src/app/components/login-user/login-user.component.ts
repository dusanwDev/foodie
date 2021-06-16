import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent implements OnInit {
  constructor(private authService: AuthService) {}
  loginUser: FormGroup;
  ngOnInit(): void {
    this.loginUser = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  submit() {
    this.authService
      .login(
        this.loginUser.get('email').value,
        this.loginUser.get('password').value,
        'loginUser'
      )
      .subscribe((data) => {});
  }
}
