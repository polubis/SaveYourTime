
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "src/app/containers/main/main.component";
import { ProductsComponent } from "src/app/containers/main/products/products.component";
import { DashboardComponent } from "src/app/containers/main/dashboard/dashboard.component";
import { ShoppingComponent } from "src/app/containers/main/shopping/shopping.component";
import { ShoppingListComponent } from "src/app/components/main/shopping/shopping-list/shopping-list.component";
import { ShoppingFormComponent } from "src/app/components/main/shopping/shopping-form/shopping-form.component";

const routes: Routes = [
    { path: '', component: MainComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'shopping', component: ShoppingComponent, children: [
            { path: '', component: ShoppingListComponent },
            { path: 'add', component: ShoppingFormComponent },
          ]
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
