import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddHouseComponent } from './components/add-house/add-house.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { RegisterAsComponent } from './components/register-as/register-as.component';
import { HouseSearchComponent } from './components/house-search/house-search.component';
import { ReservationCartComponent } from './components/reservation-cart/reservation-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HousesComponent } from './components/houses/houses.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HousesListComponent } from './components/houses-list/houses-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AddHouseComponent,
    AddRoomComponent,
    RegisterAsComponent,
    HouseSearchComponent,
    ReservationCartComponent,
    HousesComponent,
    RoomsComponent,
    UsersListComponent,
    HousesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
