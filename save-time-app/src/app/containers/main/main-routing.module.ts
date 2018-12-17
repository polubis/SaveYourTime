
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "src/app/containers/main/main.component";
import { ProductsComponent } from "src/app/containers/main/products/products.component";
import { DashboardComponent } from "src/app/containers/main/dashboard/dashboard.component";
import { MealsComponent } from "src/app/containers/main/meals/meals.component";

const routes: Routes = [
    { path: '', component: MainComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'meals', component: MealsComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
