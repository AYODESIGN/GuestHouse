import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';
import { HouseService } from 'src/app/services/house.service';
import { TokenStorageService } from 'src/app/services/token-storge.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  addRoomForm: FormGroup;
  userId: any;
  authToken: any;
  userHouses:any;
  selectedHouseId: any;
  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private tokkenStorge: TokenStorageService,
  ) { }

  ngOnInit() {
    this.userId = this.tokkenStorge.getUser().id
this.authToken = this.tokkenStorge.getToken()
console.log(this.tokkenStorge.getToken())

this.houseService.getAllHousesByUserId(this.userId,this.authToken).subscribe((response)=>{
this.userHouses = response
console.log(response)
})
    this.addRoomForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required]],
      imgUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      houseId:[''],
    });
  }

  getHouseImage(houseId: number): string {
    const selectedHouse = this.userHouses.find((house) => house.id == houseId);
    console.log(houseId)
    console.log(selectedHouse.imgUrl)
    return selectedHouse ? selectedHouse.imgUrl : '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpC8mEcBVCVvRM6oFG2PydedrVnm9FroC8qDpvTtuPFmy256gGQiDdkYU0qJtwTeLZjiU&usqp=CAU"';
  }
  


  addRoom() {
    const houseData = this.addRoomForm.value;
    houseData.house = { id: this.selectedHouseId }; // Set the user ID
    console.log(houseData);
    this.houseService.addRoom(houseData, this.authToken).subscribe((response) => {
      console.log(response);
    });
    swal('Success!', `Room added successfully!`, 'success')

  }

}
