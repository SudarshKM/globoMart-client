import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'],
})
export class AllProductComponent implements OnInit {
  allProducts: any = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  constructor(private api: ApiService) {}

  getAllProducts() {
    this.api.allProductApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //add to wishlist
  addToWishListButton(products: any) {
    //sessionStorage verify

    if (sessionStorage.getItem('token')) {
      this.api.addToWishList(products).subscribe({
        next: (res: any) => {
          console.log(res);
          alert('Wishlist added');

        this.api.getWishListCount()
        },
        error: (err) => {
          console.log(err);
          alert('Wishlist already added');
        },
      });
    } else {
      alert('Please login ');
    }
  }

    //add to cart
    addToCartButton(products: any) {
      //sessionStorage verify
  
      if (sessionStorage.getItem('token')) {
        this.api.addTocart(products).subscribe({
          next: (res: any) => {
            console.log(res);
            alert('cart added');
  
          // this.api.getWishListCount()
          this.api.getCartCount()
          },
          error: (err) => {
            console.log(err);
            alert('cart already added');
          },
        });
      } else {
        alert('Please login ');
      }
    }
}
