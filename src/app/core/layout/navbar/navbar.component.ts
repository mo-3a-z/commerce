import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  _authService=inject(AuthService)
  _router=inject(Router)
  isLogedIn:any

  constructor(){
   
    
  }
  ngOnInit(): void {
    this.checkLoggedInStatus()
  }

  checkLoggedInStatus(){
    this._authService.userData.subscribe({
      next:(res)=>{
        this.isLogedIn=res
      }
    })
  }

  signOut(){
  this._authService.logOut();
  }

}




