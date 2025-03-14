import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseURL=environment.baseUrl;
  private readonly _httpClient= inject(HttpClient);

  constructor() { }


  getProducts(categoryId?:string):Observable<any>{

    let url = categoryId ? `${this.baseURL}/products?category[in]=${categoryId}`: `${this.baseURL}/products`
    return this._httpClient.get(url)
  }
  getProductById(id:string):Observable<any>{
    return this._httpClient.get(`${this.baseURL}/products/${id}`)

  }
}
