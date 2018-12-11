import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from "src/app/containers/home/home.component";
import { ProductsComponent } from "src/app/components/home/products/products.component";
import { MealsComponent } from './components/home/meals/meals.component';
import { DietsComponent } from './components/home/diets/diets.component';
import { TrainingsComponent } from './components/home/trainings/trainings.component';
import { StatisticsComponent } from './components/home/statistics/statistics.component';
import { TimerComponent } from './components/utils/timer/timer.component';
import { StartPageComponent } from './containers/start-page/start-page.component';
import { NavigationComponent } from "src/app/components/home/navigation/navigation.component";
import { ProductsCartComponent } from './components/products/products-cart/products-cart.component';
import { RatesComponent } from './components/utils/rates/rates.component';
import { SliderComponent } from './components/utils/slider/slider.component';
import { SpinnerComponent } from './components/utils/spinner/spinner.component';
import { TutorialsComponent } from "src/app/components/start-page/tutorials/tutorials.component";
import { TutorialComponent } from "src/app/components/start-page/tutorials/tutorial/tutorial.component";


import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers } from './app.reducers';
import { ProductsEffects } from "src/app/store/products/effects";
import { ModalComponent } from './components/utils/modal/modal.component';
import { FormComponent } from './components/utils/form/form.component';
import { LogInComponent } from './components/start-page/log-in/log-in.component';
import { RegisterComponent } from './components/start-page/register/register.component';
import { UsersEffects } from "src/app/store/users/effects";

import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { NotificationComponent } from './components/utils/notifications/notification/notification.component';
import { NotificationsReducer } from "src/app/store/notifications/effects";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ProductsComponent,
    MealsComponent,
    DietsComponent,
    TrainingsComponent,
    StatisticsComponent,
    TimerComponent,
    StartPageComponent,
    TutorialsComponent,
    TutorialComponent,
    ProductsCartComponent,
    RatesComponent,
    SliderComponent,
    SpinnerComponent,
    ModalComponent,
    FormComponent,
    LogInComponent,
    RegisterComponent,
    NotificationsComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ProductsEffects, UsersEffects, NotificationsReducer]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
