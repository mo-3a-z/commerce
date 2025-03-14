import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit {

  apiError!:string;
  isCallingApi:boolean=false;
  subscription:Subscription=new Subscription();
  toggleInput:boolean=false
  loginForm!:FormGroup
  _authService=inject(AuthService);
  _router=inject(Router)

login(){
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched(); 
  }else{
    this.apiError=''
    this.isCallingApi=true;
    if (this.subscription) this.subscription.unsubscribe();
      
    this.subscription=this._authService.loginUser(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isCallingApi=false;
          localStorage.setItem("userToken",res.token)
          this._authService.saveUser()
          this._router.navigate(['/home'])


          // timer(1000).subscribe(()=>{
          //   this._router.navigate(['/home'])

          // })

          // setTimeout(()=>{
          //   this._router.navigate(['/home'])

          // },2000)


        },
        error:(err)=>{
          console.log(err);
          this.apiError=err.error.message;
          this.isCallingApi=false;

          
        },
        complete:()=>{
        }

    })
  }
}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
  this.loginForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),
    })
  }


  togglePassword(){
    this.toggleInput=!this.toggleInput
  }

ngOnDestroy(): void {
  this.subscription.unsubscribe()
}
 
}
