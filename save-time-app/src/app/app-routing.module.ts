import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "src/app/containers/home/home.component";
import { ProductsComponent } from "src/app/components/home/products/products.component";
import { MealsComponent } from "src/app/components/home/meals/meals.component";
import { DietsComponent } from "src/app/components/home/diets/diets.component";
import { TrainingsComponent } from "src/app/components/home/trainings/trainings.component";
import { StatisticsComponent } from "src/app/components/home/statistics/statistics.component";
import { StartPageComponent } from "src/app/containers/start-page/start-page.component";
import { TutorialsComponent } from "src/app/components/start-page/tutorials/tutorials.component";

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
      { path: 'products', component: ProductsComponent },
      { path: 'meals', component: MealsComponent },
      { path: 'diets', component: DietsComponent },
      { path: 'trainings', component: TrainingsComponent },
      { path: 'statistics', component: StatisticsComponent },
    ]
  },
  { path: 'start', component: StartPageComponent, children: [
      { path: '', component: TutorialsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
