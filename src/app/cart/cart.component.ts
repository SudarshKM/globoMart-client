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
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
