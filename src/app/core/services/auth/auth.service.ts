import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser, loginUser } from '../../interfaces/auth-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import {jwtDecode} from  'jwt-decode'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  env=environment.baseUrl
 _httpClient  = inject(HttpClient)
  userData:BehaviorSubject<any>= new BehaviorSubject(null)
  _router=inject(Router)



  constructor() { }

registerUser(userInfo:AuthUser) :Observable<any>{
return this._httpClient.post(`${this.env}/auth/signup`,userInfo)
}


loginUser(userInfo:loginUser) :Observable<any>{
return this._httpClient.post(`${this.env}/auth/signin`,userInfo)
}



saveUser(){
    if (localStorage.getItem("userToken")) {
      this.userData.next(jwtDecode(localStorage.getItem("userToken")!))
    }
}

isLoggedInUser(){
  if (localStorage.getItem("userToken")) {
    this.userData.next(jwtDecode(localStorage.getItem("userToken")!))
  
  
  }
}

logOut(){
  localStorage.removeItem("userToken")
  this.userData.next(null)
  this._router.navigate(['/auth/login'])
}


}



