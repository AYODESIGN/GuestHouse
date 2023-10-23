import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
                   
  houseUrl = "http://localhost:8080/api/houses";

  constructor(private http: HttpClient) { }

  getAllHouses(authToken:string) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
    return this.http.get(this.houseUrl,{headers});
  }

  searchHouses(searchKeyword: string, authToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    const params = new HttpParams().set('searchKeyword', searchKeyword);
    return this.http.get(this.houseUrl, { headers, params });
  }

  getAllRooms(authToken:string) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
    return this.http.get(`${this.houseUrl}/room`,{headers});
  }

  
  getAllHousesByUserId(userId,authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
    return this.http.get(`${this.houseUrl}/user/${userId}`,{headers});
  }

  getAllRoomsByHouseId(houseId,authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
    console.log(houseId)
    return this.http.get(`${this.houseUrl}/room/user/${houseId}`,{headers});
  }

  getHouseById(id: number, authToken) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
    return this.http.get(`${this.houseUrl}/${id}`,{headers});
  }

  deleteHouseById(id: number,authToken:string) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
    return this.http.delete(`${this.houseUrl}/${id}`,{headers});
  }

  addHouse(house: any, authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
     return this.http.post(this.houseUrl, house, {headers});
  }

  editHouse(house, authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
    return this.http.put(`${this.houseUrl}`, house, {headers});
  }

  addRoom(room: any, authToken: string) {
    const headers = { 'Authorization': `Bearer ${authToken}` }
     return this.http.post(`${this.houseUrl}/room/add`, room, {headers});
  }
}

