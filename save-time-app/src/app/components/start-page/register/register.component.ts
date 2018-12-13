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
    username: new Setting('username', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'text'),
    email: new Setting('email', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'email'),
    password: new Setting('password', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'password'),
    repeatedPassword: new Setting('repeated password', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'password'),
  };
  isCreatingAccount;
  subscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select(state => state.users.isCreatingAccount).subscribe(isCreatingAccount => {
      this.isCreatingAccount = isCreatingAccount;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new SetRegisterState(null));
  }

  register(formData: any) {
    const { username, email, password } = formData;
    this.store.dispatch(new StartRegister({username, email, password}));
  }
}
