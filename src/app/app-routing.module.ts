import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AddHouseComponent } from './components/add-house/add-house.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { RegisterAsComponent } from './components/register-as/register-as.component';
import { HouseSearchComponent } from './components/house-search/house-search.component';
import { ReservationCartComponent } from './components/reservation-cart/reservation-cart.component';
import { HousesComponent } from './components/houses/houses.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { HousesListComponent } from './components/houses-list/houses-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';


const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "header", component: HeaderComponent},
  {path: "signup", component: SignupComponent},
  {path: "signup/client", component: SignupComponent},
  {path: "signup/owner", component: SignupComponent},
  {path: "signup/admin", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "register-as", component:RegisterAsComponent },
  {path: "add-house", component: AddHouseComponent},
  {path: "edit-house/:id", component: AddHouseComponent},
  {path: "houses", component: HousesComponent},
  {path: "rooms/:id", component: RoomsComponent},
  {path: "add-room", component: AddRoomComponent},
  {path: "house-search", component: HouseSearchComponent},
  {path: "reservation-cart", component: ReservationCartComponent},
  {path: "houses-list", component: HousesListComponent},
  {path: "users-list", component: UsersListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
