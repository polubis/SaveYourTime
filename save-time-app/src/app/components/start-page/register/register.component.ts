import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormSettings, Setting } from "src/app/components/utils/form/form";
import { Store } from "@ngrx/store";
import { AppState } from '../../../app.reducers';
import { StartRegister, SetRegisterState } from '../../../store/users/actions';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerFormSettings: FormSettings = {
    username: new Setting('username', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'text', '', 'piotr'),
    email: new Setting('email', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'email', '', 'piotr@wp.pl'),
    password: new Setting('password', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'password', '', 'piotr'),
    repeatedPassword: new Setting('repeated password', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'password', '', 'piotr'),
  };
  isCreatingAccount;
  subscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select(state => state.users).subscribe(state => {
      this.isCreatingAccount = state.isCreatingAccount;
      if (state.createAccountStatus) {
        alert("Pomyslnie zalogowano");
      }
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new SetRegisterState(null));
  }

  register(formData: any) {
    this.store.dispatch(new StartRegister(formData));
  }
}
