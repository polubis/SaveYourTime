
import { Injectable } from "@angular/core";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { getToken } from "src/app/store";

@Injectable({providedIn: "root"})
export class AuthService {
  token = '';
  constructor(private store: Store<AppState>) {
    this.store.select(getToken)
      .subscribe((token: string) => {
        this.token = token;
      });
  }
}
