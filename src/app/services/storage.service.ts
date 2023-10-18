import { Injectable } from '@angular/core';
import { UserType } from '../models/shop-type';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private users:UserType[] = [{id:1, email:"dharun@gmail.com", pass:"Pass@123", cart:[]}]
  constructor() { }

  getUserList():UserType[]{
    return this.users;
  }

  getAllUsers():UserType[]{
    if(!localStorage.getItem("users")){
      localStorage.setItem("users",JSON.stringify(this.users));
    }
    this.users = JSON.parse(localStorage.getItem("users")!);
    return this.users;
  }

  setUserSession(value:string):void{
    sessionStorage.setItem("user", JSON.stringify(value));
  }

  logoutUser():void{
    sessionStorage.removeItem("user");
  }

  setUsers(user:UserType):void{
    this.users.push({...user, cart:[]});
    localStorage.setItem("users",JSON.stringify(this.users));
  }
}
