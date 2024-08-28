import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css'],
})
export class WhishlistComponent implements OnInit {
  allProducts: any = [];
  token: any = '';

  ngOnInit(): void {
    this.getWishiList();
    this.token = sessionStorage.getItem('token');
  }

  constructor(private api: ApiService) {}

  getWishiList() {
    this.api.getWishListItemApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeWishListItem(id: any) {
    this.api.deleteWishListItemApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getWishiList();

        this.api.getWishListCount();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
