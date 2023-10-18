import { Component, ViewChild } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserType } from 'src/app/models/shop-type';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  @ViewChild('closeModal') closeModal: any;
  @ViewChild('openLogin') openLogin: any;
  constructor(
    private dataObj: ShopService,
    private authObj: AuthService,
    private router: Router,
    private storageObj: StorageService
  ) {}

  navCartLength(): number {
    return this.dataObj.getAllCart().length;
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
    else{
      console.log("Wrong Credentials");
    }
  }

  loginStatus(): boolean {
    return this.authObj.getLoginStatus();
  }

  // Logout
  logout():void{
    this.authObj.logoutUser();
    this.router.navigate([''],{replaceUrl:true});
  }

  // // openModal
  // openLoginForm():void{
  //   this.openModal.nativeElement.click();
  // }

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
