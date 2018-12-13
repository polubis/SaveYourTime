import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from "src/app/containers/home/home.component";
import { TimerComponent } from './components/utils/timer/timer.component';
import { StartPageComponent } from './containers/start-page/start-page.component';
import { RatesComponent } from './components/utils/rates/rates.component';
import { SliderComponent } from './components/utils/slider/slider.component';
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
import { ProductsCartComponent } from "src/app/components/common/products-cart/products-cart.component";
import { NavigationComponent } from "src/app/components/utils/navigation/navigation.component";
import { UtilsModule } from "src/app/components/utils/utils.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimerComponent,
    StartPageComponent,
    TutorialsComponent,
    TutorialComponent,
    ProductsCartComponent,
    RatesComponent,
    SliderComponent,
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
    EffectsModule.forRoot([ProductsEffects, UsersEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
