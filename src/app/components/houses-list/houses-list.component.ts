import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';
import { HouseService } from 'src/app/services/house.service';
import { TokenStorageService } from 'src/app/services/token-storge.service';
import { resolve } from 'url';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.css']
})
export class HousesListComponent implements OnInit {
  userId: any;
  authToken: any;
  rooms:any;
  houses:any;
  constructor(
    private houseService: HouseService,
    private tokkenStorge: TokenStorageService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.userId = this.tokkenStorge.getUser().id
this.authToken = this.tokkenStorge.getToken()
console.log(this.tokkenStorge.getToken())

this.getAllHouses()

this.getAllRooms()

  }

  editHouse(id){
    this.router.navigate([`edit-house//${id}`]);


  }


 getAllHouses(){
  this.houseService.getAllHouses(this.authToken).subscribe((response)=>{
    this.houses = response
    console.log(response)
    })
 }
  

  getAllRooms(){
    this.houseService.getAllRooms(this.authToken).subscribe((response)=>{
      this.rooms = response;
      console.log(response);
    })
     }

     deleteHouse(id){
      this.houseService.deleteHouseById(id,this.authToken).subscribe((response)=>{
        console.log(response)
        this.getAllHouses()
        this.getAllRooms()
      })
     }

     calculateTotalRooms(house) {
      if (!this.rooms) {
        return 0; // Handle the case when this.rooms is not defined
      }
    
      const houseId = house.id;
      const roomsForHouse = this.rooms.filter(room => room.house.id == houseId);
      return roomsForHouse.length;
    }
    
    

}
