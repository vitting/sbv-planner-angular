import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isUserAuthenticated$.pipe(map((result) => {
      console.log(result);

      if (result && this.authService.authUserInfo && this.authService.authUserInfo.accepted) {
        if (route.data && route.data.onlyAdmin) {
          if (this.authService.authUserInfo.admin) {
            return true;
          } else {
            this.router.navigate(["/"]);
            return false;
          }
        } else if (route.data && route.data.onlyEditor) {
          if (this.authService.authUserInfo.editor) {
            return true;
          } else {
            this.router.navigate(["/"]);
            return false;
          }
        } else {
          return true;
        }
      } else {
        if (this.authService.authUserInfo && this.authService.authUserInfo.waitingForApproval) {
          this.router.navigate(["/message"]);
          return false;
        }

        if (route.data && !route.data.noAuthRequired) {
          this.router.navigate(["/login"]);
          return false;
        } else {
          return true;
        }
      }
    }));
  }

}
