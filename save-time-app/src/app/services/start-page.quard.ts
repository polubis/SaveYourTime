import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class StartPageGuard implements CanActivate {
    constructor(private router: Router, private cookieService: CookieService) { }

    canActivate(): boolean {

      if (!this.cookieService.check('token')) {
        return true;
      }

      this.router.navigate(['main']);
      return false;

    }
}
