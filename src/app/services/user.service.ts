import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = "http://localhost:8080/api/auth";
  constructor(private http:HttpClient){}

  signup(user) {
    return this.http.post( this.userUrl + "/register" , user);
    }
    // user = {email,password}
    login(user) {
    return this.http.post<{ accessToken: any }>( this.userUrl + "/login" , user);
    }

    deleteUserById(id: number,authToken:string) {
      const headers = { 'Authorization': `Bearer ${authToken}` }
      return this.http.delete(`${this.userUrl}/${id}`,{headers});
    }

    getAllUsers(authToken:string) {
      const headers = { 'Authorization': `Bearer ${authToken}` }
      return this.http.get(this.userUrl,{headers});
    }
  

    }


