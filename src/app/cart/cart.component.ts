import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  allProducts: any = [];
  token: any = '';

  total?:number

  ngOnInit(): void {
    this.getCartItem();
    this.token = sessionStorage.getItem('token');
  }

  constructor(private api: ApiService) {}

  getCartItem() {
    this.api.getCartItemApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts = res;
        this.getTotal()

      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  //add to cart
  addToCartButton(products: any) {
    //sessionStorage verify

    if (sessionStorage.getItem('token')) {
      this.api.addTocart(products).subscribe({
        next: (res: any) => {
          console.log(res);
          // alert('cart added');
          this.getCartItem();

          // this.api.getWishListCount()
          this.api.getCartCount();
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

  decrement(products: any) {
    this.api.decrementItem(products).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getCartItem();


      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(id: any) {
    this.api.deleteCartItem(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getCartItem();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTotal(){
    this.total= Math.ceil(this.allProducts.map((item:any)=>item.grandTotal).reduce((n1:any , n2:any)=>n1+n2)
    )
  }

  empty(){
    this.api.emptyCart().subscribe({
      next: (res: any) => {
        console.log(res);
        this.getCartItem();
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
