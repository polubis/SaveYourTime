import { Component } from '@angular/core';
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { ChangeState } from "src/app/store/users/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'save-time-app';
  constructor(private cookieService: CookieService, private store: Store<AppState>) {
    window.addEventListener("dragover", function(e){
      e.preventDefault();
    },false);
    window.addEventListener("drop", function(e){
      e.preventDefault();
    },false);
    const token = this.cookieService.get('token');
    this.store.dispatch(new ChangeState( {key: 'token', value: token} ));
  }
}
