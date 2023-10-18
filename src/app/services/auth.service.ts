import { Injectable } from '@angular/core';
import { UserType } from '../models/shop-type';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false
  constructor(private storageObj: StorageService) { }

  isValidUser(user:UserType):boolean{
    const users:UserType[] = this.storageObj.getAllUsers();
    for(let u of users){
      if(user.email === u.email && user.pass === u.pass){
        this.isLoggedIn = true;
        this.storageObj.setUserSession(user.email);
        const loggedInUser = sessionStorage.getItem("user");
        const userCart = JSON.parse(localStorage.getItem(loggedInUser!)!);
        if(loggedInUser)
          if(userCart)
            localStorage.setItem(loggedInUser, JSON.stringify(userCart));
          else
            localStorage.setItem(loggedInUser, JSON.stringify([]));
        return this.isLoggedIn;
      }
    }
    return this.isLoggedIn;
  }

  getLoginStatus():boolean{
    return sessionStorage.getItem("user")!==null;
  }

  logoutUser():void{
    this.storageObj.logoutUser();
    this.isLoggedIn = false;
  }
}
