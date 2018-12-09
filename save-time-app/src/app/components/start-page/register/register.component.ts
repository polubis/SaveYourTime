import { Component, OnInit } from '@angular/core';
import { FormSettings, Setting } from "src/app/components/utils/form/form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormSettings: FormSettings = {
    username: new Setting('username', { isNotEmptyString: true, minLength: 3, maxLength: 50 }),
    emailAdress: new Setting('email', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'email'),
    password: new Setting('password', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'password'),
    repeatedPassword: new Setting('repeated password', { isNotEmptyString: true, minLength: 3, maxLength: 50 }, 'password'),
  };
  constructor() { }

  ngOnInit() {
  }

}
