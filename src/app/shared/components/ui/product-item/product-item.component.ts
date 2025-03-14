import { Component, Input, Output, output, } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})


export class ProductItemComponent {

  @Input() Product!:Product
  // product=input.required<Product>()


  @Output() fireAddToCart:EventEmitter<any> = new EventEmitter();


  handleAddToCart(id:string){
    this.fireAddToCart.emit(id)
  }

}
