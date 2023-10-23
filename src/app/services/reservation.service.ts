import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservationUrl = "http://localhost:8080/api/reservations";

  constructor(private http: HttpClient) { }

  getAllReservations(authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    return this.http.get(this.reservationUrl, { headers });
  }

  getReservationsByUserId(userId: number, authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    return this.http.get(`${this.reservationUrl}/user/${userId}`, { headers });
  }

  getReservationById(id: number, authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    return this.http.get(`${this.reservationUrl}/${id}`, { headers });
  }

  deleteReservationById(id: number, authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    return this.http.delete(`${this.reservationUrl}/${id}`, { headers });
  }

  addReservation(reservation: any, authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    return this.http.post(this.reservationUrl, reservation, { headers });
  }

  editReservation(reservation: any, authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` };
    return this.http.put(this.reservationUrl, reservation, { headers });
  }
}
