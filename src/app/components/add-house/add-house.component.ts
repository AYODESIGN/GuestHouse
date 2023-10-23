import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';
import { HouseService } from 'src/app/services/house.service';
import { TokenStorageService } from 'src/app/services/token-storge.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {

  addHouseForm: FormGroup;
  id: any;
  authToken: any;
  currentUrl: String;
  title: String = "ADD HOUSE";
  foundHouse: any = {};
  houseId: any;


  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private tokkenStorge: TokenStorageService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.tokkenStorge.getUser().id;
  }

  ngOnInit() {
    this.houseId = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = this.tokkenStorge.getUser().id;
    this.authToken = this.tokkenStorge.getToken();
    console.log(this.tokkenStorge.getToken());
    console.log(this.houseId);

    // Define an observable for fetching the house data
    const getHouseObservable = this.houseService.getHouseById(this.houseId, this.authToken);

    // Check if houseId is provided and fetch data
    if (this.houseId) {
      getHouseObservable.subscribe((response) => {
        console.log(response);
        this.foundHouse = response;
        this.setupEditForm();
      });
    } else {
      this.title = "ADD HOUSE";
      this.setupAddForm();
    }
  }

  setupAddForm() {
    this.addHouseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required]],
      imgUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      userId: [this.id],
    });
  }

  setupEditForm() {
    this.title = "EDIT HOUSE";
    this.addHouseForm = this.formBuilder.group({
      name: [this.foundHouse.name, [Validators.required, Validators.minLength(3)]],
      address: [this.foundHouse.address, [Validators.required, Validators.minLength(5)]],
      description: [this.foundHouse.description, [Validators.required, Validators.minLength(10)]],
      city: [this.foundHouse.city, [Validators.required]],
      imgUrl: [this.foundHouse.imgUrl, [Validators.required, Validators.pattern('https?://.+')]],
      userId: [this.foundHouse.user.id],
    });
  }

  addHouse() {
    const houseData = this.addHouseForm.value;
    houseData.user = { id: this.id };
    console.log(houseData);
    this.houseService.addHouse(houseData, this.authToken).subscribe((response) => {
      console.log(response);
    });
    swal('Success!', `House added successfully!`, 'success')

  }

  editHouse() {
    const houseData = this.addHouseForm.value;
    houseData.user = { id: this.id };
    houseData.id = this.houseId
    console.log(houseData);
    this.houseService.editHouse(houseData,  this.authToken).subscribe((response) => {
      console.log(response);
    });
    swal('Success!', `House edited successfully!`, 'success')

  }
}
