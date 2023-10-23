import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';
import { TokenStorageService } from 'src/app/services/token-storge.service';
import { resolve } from 'url';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userId: any;
  authToken: any;
  users:any;
  constructor(
    private userService: UserService,
    private tokkenStorge: TokenStorageService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.userId = this.tokkenStorge.getUser().id
this.authToken = this.tokkenStorge.getToken()
console.log(this.tokkenStorge.getToken())

this.getAllUsers()


  }

  editHouse(id){
    this.router.navigate([`edit-house//${id}`]);


  }


 getAllUsers(){
  this.userService.getAllUsers(this.authToken).subscribe((response)=>{
    this.users = response
    console.log(response)
    })
 }
  

  

     deleteUser(id){
      this.userService.deleteUserById(id,this.authToken).subscribe((response)=>{
        console.log(response)
        this.getAllUsers()
      })
     }

    
    
    

}
