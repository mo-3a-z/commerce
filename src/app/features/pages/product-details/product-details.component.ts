import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'node:console';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../shared/services/Cart/cart.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, ProductItemComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

 private readonly _activatedRoute=inject(ActivatedRoute);
 private readonly _productService=inject(ProductService);
 private readonly _cartService=inject(CartService);
 private readonly _toastr=inject(ToastrService);

//  productDetails:Product ={}as Product
 productDetails !:Product 
 recentProducts !:Product []
 APIError!:string
 isLoading:boolean=false


   customOptions: OwlOptions = {
     loop: true,
     mouseDrag: true,
     touchDrag: false,
     pullDrag: false,
     dots: false,
     navSpeed: 700,
     navText: ['<i class="fa-solid fa-square-caret-left"></i>', '<i class="fa-solid fa-square-caret-right"></i>'],
     responsive: {
       0: {
         items: 1
       }
     },
     nav: true
   }

  ngOnInit(): void {
    this.getId()
  }
  getId(){
    this._activatedRoute.paramMap.subscribe({
      next:(res:any)=>{
        console.log(res?.params?.id);
        this.getDetails(res?.params?.id)
        
      },
      error:(err)=> {
this.APIError=err.error.message        
        
      },
    })

// let {id}:any=this._activatedRoute.snapshot.params
// console.log(id);
  }

  getDetails(id:string){
        this._productService.getProductById(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.productDetails=res.data
          
          this.getRelatedProducts(this.productDetails.category._id)
  }
})
  }


    getRelatedProducts(categoryId:string){
      this._productService.getProducts(categoryId).subscribe({
        next:(res)=>{
          this.recentProducts=res.data
        }
      })
    }

    

    addToCart(id: string) {
      this.isLoading = true;
      this._cartService.addProductToCart(id).subscribe({
          next: (res) => {
              this.isLoading = false;
              this._toastr.success(res.message, 'HI!');

              
          },
          error: (err) => {
              console.error("Error adding product to cart:", err);
              this.isLoading = false;
          }
      });
  }
  
}
