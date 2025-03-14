import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../shared/services/Order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  private readonly _activatedRoute=inject(ActivatedRoute)
  private readonly _orderService=inject(OrderService)
  cartId!:string
  chckOutForm!:FormGroup

  ngOnInit() {
this.getCartId()
this.initForm()
  }

  getCartId(){
    let {cartId} =this._activatedRoute.snapshot.params['cartId']
  }
initForm(){
  this.chckOutForm =new FormGroup({
    details:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required]),
  })
}


completeOrder(){
this._orderService.cashOrder(this.cartId,this.chckOutForm.value).subscribe({
  next:(res)=>{
    console.log(res);
    
  }
})
}
}
