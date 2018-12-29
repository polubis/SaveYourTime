import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + this.authService.token)
    });
    return next.handle(authRequest);
  }
}