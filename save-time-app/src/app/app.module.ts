import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from "src/app/containers/home/home.component";
import { TimerComponent } from './components/utils/timer/timer.component';
import { StartPageComponent } from './containers/start-page/start-page.component';
import { TutorialsComponent } from "src/app/components/start-page/tutorials/tutorials.component";
import { TutorialComponent } from "src/app/components/start-page/tutorials/tutorial/tutorial.component";


import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers } from './app.reducers';
import { ProductsEffects } from "src/app/store/products/effects";
import { LogInComponent } from './components/start-page/log-in/log-in.component';
import { RegisterComponent } from './components/start-page/register/register.component';
import { UsersEffects } from "src/app/store/users/effects";

import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { NotificationComponent } from './components/utils/notifications/notification/notification.component';
import { ProductsInstructionComponent } from './components/home/products/products-instruction/products-instruction.component';
import { UtilsModule } from "src/app/components/utils/utils.module";
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from "@angular/common";
import { NotificationsEffects } from "src/app/store/notifications/effects";
import { ExtractionsEffects } from "src/app/store/extractions/effects";
import { CookieService } from 'ngx-cookie-service';
import { StartPageGuard } from "src/app/services/start-page.quard";
import { MainPageGuard } from "src/app/services/main-page.guard";
import { HeaderInterceptor } from "src/app/services/header-interceptor";
import { MainPageActivateGuard } from "src/app/services/main-page-activate.guard";
registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimerComponent,
    StartPageComponent,
    TutorialsComponent,
    TutorialComponent,
    LogInComponent,
    RegisterComponent,
    NotificationsComponent,
    NotificationComponent,
    ProductsInstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UtilsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ProductsEffects, UsersEffects, NotificationsEffects, ExtractionsEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    CookieService,
    StartPageGuard,
    MainPageGuard,
    MainPageActivateGuard,
    { provide: LOCALE_ID, useValue: 'pl' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
