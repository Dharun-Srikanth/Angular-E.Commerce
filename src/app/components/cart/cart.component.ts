import { Component } from '@angular/core';
import { CartType } from 'src/app/models/shop-type';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems:CartType[] = [];

  constructor(private dataObj:ShopService){
    this.cartItems = dataObj.getAllCart();
  }

  cartSize():number{
    return this.cartItems.length;
  }

  removeAll():void{
    this.cartItems = this.dataObj.removeAll();
  }

  minusFunction(id:number):void{
    this.cartItems = this.dataObj.minus(id);
  }

  plusFunction(id:number):void{
    this.cartItems = this.dataObj.plus(id);
  }

  removeItem(id:number):void{
    this.cartItems = this.dataObj.remove(id);
  }

  totalPrice():number{
    return this.dataObj.getTotalPrice();
  }

  checkout():void{
    this.dataObj.checkout();
  }
}
