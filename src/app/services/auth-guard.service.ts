import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
      // If no authentication is required
      if (route.data && route.data.noAuthRequired) {
        if (environment.authGuardDebug) {
          console.log("AUTHGUARD NO AUTH REQUIRED");
        }

        return true;
      }

      // If user isn't authenticated
      if (!result) {
        if (environment.authGuardDebug) {
          console.log("AUTHGUARD WE ARE NOT AUTHENTICATED");
        }

        this.router.navigate(["/login"]);
        return false;
      }

      // If we are waiting for approval
      if (this.authService.authUserInfo.waitingForApproval) {
        if (environment.authGuardDebug) {
          console.log("AUTHGUARD WE ARE WAITING FOR APPROVAL");
        }

        this.router.navigate(["/message"]);
        return false;
      }

      // If user isn't accpeted
      if (!this.authService.authUserInfo.accepted) {
        if (environment.authGuardDebug) {
          console.log("AUTHGUARD WE ARE NOT ACCEPTED");
        }

        this.router.navigate(["/login"]);
        return false;
      }

      // If user have to be Administrator
      if (route.data && route.data.onlyAdmin) {
        if (this.authService.authUserInfo.admin) {
          if (environment.authGuardDebug) {
            console.log("AUTHGUARD ONLY ADMIN TRUE");
          }

          return true;
        } else {
          if (environment.authGuardDebug) {
            console.log("AUTHGUARD ONLY ADMIN FALSE");
          }

          this.router.navigate(["/"]);
          return false;
        }
      }

      // If user have to be Editor
      if (route.data && route.data.onlyEditor) {
        if (this.authService.authUserInfo.editor) {
          if (environment.authGuardDebug) {
            console.log("AUTHGUARD ONLY EDITOR TRUE");
          }

          return true;
        } else {
          if (environment.authGuardDebug) {
            console.log("AUTHGUARD ONLY EDITOR FALSE");
          }

          this.router.navigate(["/"]);
          return false;
        }
      }

      if (environment.authGuardDebug) {
        console.log("AUTHGUARD WE REACHED TO END");
      }

      // If user met the requirements above
      return true;
    }));
  }

}
