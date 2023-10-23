import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';
import { HouseService } from 'src/app/services/house.service';
import { TokenStorageService } from 'src/app/services/token-storge.service';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  authToken: any;
  rooms:any;
  houseId:any
  startDate: Date; 
endDate: Date;   
userId: number;  
roomId: number; 
admin = false
user = false
owner = false
roles:any;

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private tokkenStorge: TokenStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,

 
  ) { }

  ngOnInit() {
    this.roles = this.tokkenStorge.getUser().roles;
    if (this.roles[0] == "ROLE_OWNER") {
      this.owner = true  
      }else if (this.roles[0] == "ROLE_USER") {
      this.user = true
     }else if (this.roles[0] == "ROLE_Admin") {
      this.admin = true 
     }

  this.houseId = this.activatedRoute.snapshot.paramMap.get("id");
  console.log(this.houseId);


  this.userId = this.tokkenStorge.getUser().id
    this.authToken = this.tokkenStorge.getToken()
    this.getAllRooms(this.houseId)

  }

  getAllRooms(houseId){
    this.houseService.getAllRoomsByHouseId(houseId,this.authToken).subscribe((response)=>{
      this.rooms = response;
      console.log(response);
    })
     }

     
      reserveRoom(room) {
        if (!this.startDate || !this.endDate) {
          swal("Error", "Please select both start and end dates.", "error");
          return;
        }
      
        // Create a ReservationModel object and set its properties
        const reservationData = {
          startDate: this.startDate,
          endDate: this.endDate,
          user: {id: this.userId},
          room: room // Assuming room is the entire RoomModel object
        };
        console.log("Reservation Data:", reservationData);
      
        // Send the reservationData object to your service
        this.reservationService.addReservation(reservationData, this.authToken).subscribe((response) => {
          console.log("Reservation Response:", response);
        });
      
        // Clear the input fields
        this.startDate = null;
        this.endDate = null;
      }
      
    
      isLoggedIn(): boolean {
        let token = sessionStorage.getItem('auth-token');
        if (token) {
          return true;
      }
    }
}
