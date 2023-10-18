import { Component, ViewChild } from '@angular/core';
import { CartType } from 'src/app/models/shop-type';
import { ShopService } from 'src/app/services/shop.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @ViewChild ('closeModal') closeModal:any;
  @ViewChild('openLogin') openLogin: any;

  cartList: CartType[] = [];

  constructor(
    private dataObj: ShopService,
    private authObj: AuthService,
    private router: Router,
    private storageObj: StorageService
  ) {}

  navCartLength(): number {
    this.cartList = this.dataObj.getAllCart();
    return this.cartList.length;
  }

  navPrice(): number {
    return this.dataObj.getTotalPrice();
  }

  // Login Function
  loginPage(login: NgForm): void {
    if (this.authObj.isValidUser(login.value)) {
      this.closeModal.nativeElement.click();
      this.router.navigate([''], { replaceUrl: true });
    }
  }

  loginStatus(): boolean {
    return this.authObj.getLoginStatus();
  }

  logout(): void {
    this.authObj.logoutUser();
    this.router.navigate([''], { replaceUrl: true });
  }

    // Register Page
    submitRegister(register:NgForm):void{
      if(!this.authObj.isValidUser(register.value)){
        this.openLogin.nativeElement.click();
        this.storageObj.setUsers(register.value);
      }
      else{
        alert("User Already register");
        
      }
    }
}
