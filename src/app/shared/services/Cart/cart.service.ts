import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart';

  constructor() {}

  private getToken(): string {
    return localStorage.getItem("userToken") || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      token: this.getToken()
    });
  }

  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post(this.baseUrl, { productId }, { headers: this.getHeaders() });
  }

  updateProductQuantity(productId: string, count: number): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}/${productId}`, { count }, { headers: this.getHeaders() });
  }

  getCart(): Observable<any> {
    return this._httpClient.get(this.baseUrl, { headers: this.getHeaders() });
  }

  removeSpecificItem(productId: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/${productId}`, { headers: this.getHeaders() });
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(this.baseUrl, { headers: this.getHeaders() });
  }
}
