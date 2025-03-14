import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
   baseURL =environment.baseUrl
token=JSON.stringify(localStorage.getItem('userToken'))
  private readonly _httpClient=inject(HttpClient)
  constructor() { }

  cashOrder(id:string,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
    return this._httpClient.post(`${this.baseURL}/orders/${id}`,{shippingAddress},{
      headers:{
        token:JSON.parse(this.token)
      }
    })
  }

  getAllOrders():Observable<any>{
    return this._httpClient.get(`${this.baseURL}/orders/`)
  }

  getUserOrders(id:string):Observable<any>{
    return this._httpClient.get(`${this.baseURL}/orders/${id}`)
  }

  onlinePayment(id:string,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
    return this._httpClient.post(`${this.baseURL}/orders/checkout-session/${id}?url=http://localhost:3000`,{shippingAddress},{
      headers:{
        token:JSON.parse(this.token)
      }
    })

  }

}
