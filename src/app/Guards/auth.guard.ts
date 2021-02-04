import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from 'src/app/Services/auth.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router : Router)
{}
 canActivate():boolean
 {
   if(this.authService.loggedIn())
   {
     return true;
   }
   else
   {
    this.router.navigate(['/login']);
     return false;
   }
 }
}
