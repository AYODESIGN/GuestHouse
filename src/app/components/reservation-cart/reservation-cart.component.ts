import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';
import { TokenStorageService } from 'src/app/services/token-storge.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-cart',
  templateUrl: './reservation-cart.component.html',
  styleUrls: ['./reservation-cart.component.css']
})
export class ReservationCartComponent implements OnInit {

    userId: any;
    authToken: any;
    reservations:any;

    constructor(
      private reservationService : ReservationService,
      private tokkenStorge: TokenStorageService,
    ) { }
  
    ngOnInit() {
      this.userId = this.tokkenStorge.getUser().id
  this.authToken = this.tokkenStorge.getToken()
  console.log(this.tokkenStorge.getToken())
  
  this.getAllReservationsByUserId()

    }

    getAllReservationsByUserId(){
this.reservationService.getReservationsByUserId(this.userId,this.authToken).subscribe((response)=>{
  this.reservations = response;
  console.log(response)
})
    }

    cancelRes(){
      this.reservationService.deleteReservationById(this.userId,this.authToken).subscribe((response)=>{
        console.log(response)
        this.getAllReservationsByUserId()
      })
    }


}
