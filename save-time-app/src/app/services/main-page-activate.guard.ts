import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { getLogInData } from "src/app/store";
import { ILoggedUser } from "src/app/store/users/reducers";

@Injectable()
export class MainPageActivateGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(): boolean{
    if (this.cookieService.check('token')) {
      return true;
    }
    else {
      this.router.navigateByUrl('');
      return false;
    }

  }
}
