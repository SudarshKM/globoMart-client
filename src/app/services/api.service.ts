import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    if(sessionStorage.getItem('token')){
      this.getWishListCount();
      this.getCartCount()
      // console.log('hi');
      
    }
  }

  serverURL: string = 'http://localhost:4000';

  wishListCount = new BehaviorSubject(0);

  cartCount = new BehaviorSubject(0);

  //get ALl product
  allProductApi() {
    return this.http.get(`${this.serverURL}/all-product`);
  }

  // get perticular product

  getAproductapi(id: any) {
    return this.http.get(`${this.serverURL}/product/${id}`);
  }

  //register

  registerUser(reqBody: any) {
    return this.http.post(`${this.serverURL}/register`, reqBody);
  }

  loginUser(reqBody: any) {
    return this.http.post(`${this.serverURL}/login`, reqBody);
  }

  //addtoken to header

  addTokenToHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  //api to add to wishlist

  addToWishList(reqBody: any) {
    return this.http.post(`${this.serverURL}/add-wishlist`, reqBody,this.addTokenToHeader());
  }

  //api to get wishlist item

  getWishListItemApi(){
    return this.http.get(`${this.serverURL}/wishlist-items`,this.addTokenToHeader())
  }

  getWishListCount(){
    this.getWishListItemApi().subscribe((res:any)=>{
      // console.log(res.length);
      
      this.wishListCount.next(res.length)
    })
  }

  //api to delete wishlistItem

  deleteWishListItemApi(id:any){
    return this.http.delete(`${this.serverURL}/wishlist-items/${id}`)
  }

    //api to add to cart

    addTocart(reqBody: any) {
      return this.http.post(`${this.serverURL}/add-cart`, reqBody,this.addTokenToHeader());
    }

  //api to get cart item

    getCartItemApi(){
      return this.http.get(`${this.serverURL}/cart-items`,this.addTokenToHeader())
    }

    getCartCount(){
      this.getCartItemApi().subscribe((res:any)=>{
        this.cartCount.next(res.length)
      })
    }
  
}
