import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HomepageComponent } from '../components/homepage/homepage.component';

export const accessGuard: CanActivateFn = (route, state) => {
  const authObj = inject(AuthService);
  const router = inject(Router);

  if(authObj.getLoginStatus()){
    return true;
  }else{
    router.navigate([''], {replaceUrl:true});
    return false;
  }
};
