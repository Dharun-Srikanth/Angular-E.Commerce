import { Component } from '@angular/core';
import { CartType, ShopType } from 'src/app/models/shop-type';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  productsList:ShopType[] = [];

  cartList:CartType[] = [];

  constructor(private dataObj:ShopService, private authObj: AuthService){
    this.productsList = dataObj.getAllProducts();
  }

  addToCart(id:number):void{
    this.cartList = this.dataObj.cartAdd(id);
  }

  loginStatus(): boolean {
    return this.authObj.getLoginStatus();
  }
}
