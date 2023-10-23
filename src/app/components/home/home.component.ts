import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';
import { HouseService } from 'src/app/services/house.service';
import { TokenStorageService } from 'src/app/services/token-storge.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: any
  userId: any;
  authToken: any;
  selectedHouseId: any;
  rooms:any;
  searchKeyword: string = '';
  home:any

  constructor(
    private houseService: HouseService,
    private tokkenStorge: TokenStorageService,
    private router: Router,
 
    ) { }


  ngOnInit() {
    this.userId = this.tokkenStorge.getUser().id
    this.authToken = this.tokkenStorge.getToken()
    console.log(this.tokkenStorge.getToken())
    

}



}
