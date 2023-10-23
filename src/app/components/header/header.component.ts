import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { connected } from 'process';
import { TokenStorageService } from 'src/app/services/token-storge.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
roles : any;
admin = false
user = false
owner = false
connectedUser :any;

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.roles = this.tokenStorage.getUser().roles;
    if (this.roles[0] == "ROLE_OWNER") {
      this.owner = true  
      }else if (this.roles[0] == "ROLE_USER") {
      this.user = true
     }else if (this.roles[0] == "ROLE_ADMIN") {
      this.admin = true 
     }
     this.connectedUser = JSON.parse(sessionStorage.getItem('auth-user'))
console.log(this.connectedUser)
  }


  isLoggedIn(): boolean {
    let token = sessionStorage.getItem('auth-token');
    if (token) {
      return true;
  }
}

logout() {
  // Use the SweetAlert confirmation dialog
  swal({
    title: 'Logout Confirmation',
    text: 'Are you sure you want to log out?',
    icon: 'warning',
    buttons: ['Cancel', 'Yes, Logout'],
    dangerMode: true,
  }).then((confirmed) => {
    if (confirmed) {
      this.tokenStorage.signOut();
      this.admin = false;
        this.user = false;
        this.owner = false;
      swal('Logged Out!', 'You have been successfully logged out.', 'success').then(() => {
        this.router.navigate(['/login']);
      });
    }
  });
}


 }

function isLoggedIn() {
  throw new Error('Function not implemented.');
}

