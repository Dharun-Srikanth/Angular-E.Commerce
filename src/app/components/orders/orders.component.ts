import { Component } from '@angular/core';
import { CartType } from 'src/app/models/shop-type';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders:CartType[] = [];

  constructor(private dataObj:ShopService){
    this.orders = dataObj.getAllOrders();
  }

  clearOrders():void{
    this.orders = [];
  }

  getOrders():CartType[]{
    return this.orders;
  }
}
