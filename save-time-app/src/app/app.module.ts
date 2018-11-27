import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from "src/app/containers/home/home.component";
import { NavigationComponent } from './components/utils/navigation/navigation.component';
import { ProductsComponent } from "src/app/components/home/products/products.component";
import { MealsComponent } from './components/home/meals/meals.component';
import { DietsComponent } from './components/home/diets/diets.component';
import { TrainingsComponent } from './components/home/trainings/trainings.component';
import { StatisticsComponent } from './components/home/statistics/statistics.component';
import { TimerComponent } from './components/utils/timer/timer.component';

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
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
