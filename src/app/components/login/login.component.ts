import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storge.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: any = {};
  isLoginFailed: boolean;
  isLoggedIn: boolean;
  roles: any = [];
  constructor (
  private tokenStorage: TokenStorageService,
  private userService: UserService,
  private router: Router,
  private formBuilder: FormBuilder,

  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
  
      email: ['', [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
     
    });

    
  }
  login() {
    
  console.log( "Here user" , this.loginForm.value);
  this.userService.login(this.loginForm.value).subscribe((data) => {
  this.tokenStorage.saveToken(data.accessToken);
  this.tokenStorage.saveUser(data);
  this.isLoginFailed = false ;
  this.isLoggedIn = true;
  this.roles = this.tokenStorage.getUser().roles;
console.log(this.roles[0])
  if (this.roles[0] == "ROLE_OWNER") {
    swal('Success!', 'Login!', 'success');
    this.router.navigate(["/add-house"]);
  }else if (this.roles[0] == "ROLE_USER") {
    swal('Success!', 'Login!', 'success');

    this.router.navigate(["/houses"]);
   } else if (this.roles[0] == "ROLE_OWNER") {
    swal('Success!', 'Login!', 'success');

    this.router.navigate(["/users-list"]);{
  }
   }

  });
  }

  }
    
