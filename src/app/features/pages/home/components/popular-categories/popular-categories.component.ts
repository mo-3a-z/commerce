import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../shared/services/Categories/categories.service';
import { Category } from '../../../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {

  categories !:Category[];

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
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }


  private readonly _categoriesService=inject(CategoriesService)

ngOnInit(): void {
  this.getCategories();
}
  
  getCategories(){
    this._categoriesService.getAllCategories().subscribe({
      next:(res)=>{console.log(res.data)
        ;
        this.categories=res.data
      },
      error:(err)=>{console.log(err)}  ,
      complete:()=> {
        console.log('COMPLETE');
        
      },
      })
  }
}
