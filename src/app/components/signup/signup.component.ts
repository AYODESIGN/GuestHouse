import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title:string = "signup"
  //form Id
  signUpForm: FormGroup;
  imagePreview: any;
  id: any
  user: any
  currentUrl: String
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

    ngOnInit() {
      // this.id = this.activatedRoute.snapshot.paramMap.get("id");
      // if (this.id) {
      //   this.title = "Edit Profile";
      //   this.userService.connectedUser(this.id).subscribe((response) => {
      //     console.log(response.user);
      //     this.user = response.user;
      //     console.log(this.user.firstName);
      this.currentUrl = window.location.pathname;

      if (this.currentUrl === '/signup/owner'){
        this.title = "Signup Owner"
        this.signUpForm = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          address: ['', [Validators.required, Validators.minLength(5)]],
          phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
          email: ['', [Validators.required, Validators.email]],
          password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
          role: [['owner']],
        
        });

      } else if (this.currentUrl === '/signup/client'){
        this.title = "Signup Client"
        this.signUpForm = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          address: ['', [Validators.required, Validators.minLength(5)]],
          phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
          email: ['', [Validators.required, Validators.email]],
          password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
          role: [['user']],
        
        });

    } else if (this.currentUrl === '/signup/admin') {
      this.title = "Signup Admin"
      this.signUpForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        role: [['admin']],
      
      });
  }
 }
    signup() {
      if (!this.signUpForm.invalid) {
      console.log(this.signUpForm.value);
      // this.signUpForm.value.roles = ["admin"];
      this.userService.signup(this.signUpForm.value).subscribe((data) => {
        swal('Success!', 'Registered!', 'success');
      this.router.navigate(["login"]);
      });
      }
    }
  }

  // onImageSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.signUpForm.patchValue({ img: file });
  //   this.signUpForm.updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //   this.imagePreview = reader.result as string
  //   };
  //   reader.readAsDataURL(file);
  // }

