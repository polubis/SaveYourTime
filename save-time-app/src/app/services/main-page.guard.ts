import { Route, CanLoad, UrlSegment, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { getLogInData } from "src/app/store";
import { ILoggedUser } from "src/app/store/users/reducers";

@Injectable()
export class MainPageGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>, private cookieService: CookieService) {}
  canLoad(route: Route): boolean{
    if (this.cookieService.check('token')) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
