import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormSettings, Setting, FormState } from "src/app/components/utils/form/form";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { getIsLogingIn } from "src/app/store";
import { Subscription } from "rxjs";
import { TryLogIn } from "src/app/store/users/actions";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {
  logInSub: Subscription;

  isLoging = false;
  loginFormSettings: FormSettings = {
    nameOrEmail: new Setting('username or email adress', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
    password: new Setting('password', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'password')
  };
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.logInSub = this.store.select(getIsLogingIn)
      .subscribe((status: boolean) => this.isLoging = status);
  }
  ngOnDestroy() {
    this.logInSub.unsubscribe();
  }
  logIn(formState: FormState) {
    this.store.dispatch(new TryLogIn(formState));
  }
}
