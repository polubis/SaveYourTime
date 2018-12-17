
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "src/app/containers/main/main.component";
import { MainRoutingModule } from "src/app/containers/main/main-routing.module";
import { UtilsModule } from "src/app/components/utils/utils.module";
import { ProductsComponent } from "src/app/containers/main/products/products.component";
import { DashboardComponent } from "src/app/containers/main/dashboard/dashboard.component";
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppingFormComponent } from "src/app/components/common/shopping-form/shopping-form.component";
import { ShoppingListComponent } from "src/app/components/common/shopping-list/shopping-list.component";

@NgModule({
  declarations: [ MainComponent, DashboardComponent, ProductsComponent, ShoppingComponent, ShoppingFormComponent, ShoppingListComponent ],
  imports: [ MainRoutingModule, CommonModule, UtilsModule ]
})
export class MainModule {

}
