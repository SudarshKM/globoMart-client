import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {

  productDetails?:any;
  //ActivatedRoute to access data from url
  constructor(private api: ApiService, private aRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.aRoute.params.subscribe((res) => {
      const { id } = res;
      // console.log(id); 
       this.getProduct(id);
    });
  }

  getProduct(id: any) {
    this.api.getAproductapi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productDetails= res
      },
      error: (err) => {
      console.log(err);
      
      },
    });
  }


  addToWishListButton() {
    //sessionStorage verify

    if (sessionStorage.getItem('token')) {
      this.api.addToWishList(this.productDetails).subscribe({
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
    addToCartButton() {
      //sessionStorage verify
  
      if (sessionStorage.getItem('token')) {
        this.api.addTocart(this.productDetails).subscribe({
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
