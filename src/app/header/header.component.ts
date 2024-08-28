import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  wishListCountHeader: any = 0;
  cartCountHeader: any = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      // this.api.getWishListItemApi().subscribe((res:any)=>{
      //   this.wishListCountHeader = res.length
      // })
      this.api.getWishListCount();
      this.api.wishListCount.subscribe((res) => {
        // console.log(res);
        this.wishListCountHeader = res;
      });

      this.api.getCartCount();
      this.api.cartCount.subscribe((res)=>{
        this.cartCountHeader=res
      })
    }
  }
}
