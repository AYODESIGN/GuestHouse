import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';
import { HouseService } from 'src/app/services/house.service';
import { TokenStorageService } from 'src/app/services/token-storge.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  @Input() house : any

  addRoomForm: FormGroup;
  userId: any;
  authToken: any;
  houses:any ;
  selectedHouseId: any;
  rooms:any;
  searchKeyword: string = '';
  currentUrl : string
  home:any
  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private tokkenStorge: TokenStorageService,
    private router: Router,
 
    ) { }


  ngOnInit() {
    this.currentUrl = window.location.pathname;

if (this.currentUrl == '/houses') {
  this.home = false;
} else{
this.home =true
}

  
    this.userId = this.tokkenStorge.getUser().id
    this.authToken = this.tokkenStorge.getToken()
    console.log(this.tokkenStorge.getToken())
    
    
    this.getAllHouses()
    this.getAllRooms()

}

getAllRooms(){
this.houseService.getAllRooms(this.authToken).subscribe((response)=>{
  this.rooms = response;
  console.log(response);
})
 }

getAllHouses() {
  this.houseService.getAllHouses(this.authToken).subscribe((response) => {
    if (this.currentUrl === '/houses') {
      this.houses = response;
    } else {
      if (Array.isArray(response) && response.length > 0) {
        // Extract the array of houses and limit to the first three
        this.houses = response.slice(0, 3);
        console.log(response);
      }
    }
  });
}

    
 
 searchHouses() {
  if (this.searchKeyword) {
      // Call your house service method to get houses with the search keyword
      this.houseService.searchHouses(this.searchKeyword,this.authToken).subscribe((houses) => {
          this.houses = houses;
      });
       
  } else {
      // If the search keyword is empty, get all houses
      this.getAllHouses();
  }
}

 calculateTotalRooms(house) {
  // Assuming houseId is the ID of the target house
  const houseId = house.id;

  // Filter the rooms that belong to the target house
  const roomsForHouse = this.rooms.filter(room => room.house.id === houseId);

  // Calculate the total number of rooms for the house
  return roomsForHouse.length;
}


viewRoom(id){
  console.log(id)
  this.router.navigate([ `/rooms/${id}`]);
}

}