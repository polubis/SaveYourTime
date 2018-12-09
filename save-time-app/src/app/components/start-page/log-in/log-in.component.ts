import { Component, OnInit } from '@angular/core';
import { FormSettings, Setting, FormState } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  isLoging = false;
  loginFormSettings: FormSettings = {
    nameOrEmail: new Setting('username or email adress', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
    password: new Setting('password', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'password')
  };
  constructor() { }

  ngOnInit() {
  }
  logIn(formState: FormState) {
    this.isLoging = true;
    setTimeout(() => {
      this.isLoging = false;
    }, 1500);
  }
}
