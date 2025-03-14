import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true, 
  imports: [RouterLink], 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent implements OnInit {
  isLoading:boolean=true
  cartDetails!:Cart
  emptyCart:boolean=false

  private readonly _cartService = inject(CartService);

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    console.log("Fetching cart..."); 
  
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log("Cart response:", res); 

        this.cartDetails=res
        this.isLoading=false
      },
      error: (err) => {
        console.error('Error fetching cart:', err); 
      }
    });
  }

  removeItem(id:string){  
    this.isLoading=true

    this._cartService.removeSpecificItem(id).subscribe({
      next:(res)=>{
        this.isLoading=false

      }
    })
  }
  

  updateCount(id:string,count:number){
    this.isLoading=true
    this._cartService.updateProductQuantity(id,count ).subscribe({
      next:(res)=>{
        console.log(res);
    this.isLoading=false
        
      }

    })
  }

  clearCart(){
    this.isLoading=true
    this._cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
    this.isLoading=false

        if (res.message=="success") {
          this.cartDetails={} as Cart;
          this.emptyCart =true
          
        }
        
      }

    })
  }
}
