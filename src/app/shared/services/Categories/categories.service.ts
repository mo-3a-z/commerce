import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  env=environment.baseUrl

  private readonly _httpClient=inject(HttpClient)

  constructor() { }

  getAllCategories() :Observable<any>{
   return this._httpClient.get(`${this.env}/categories`)
  }
}
