
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "src/app/containers/main/main.component";
import { MainRoutingModule } from "src/app/containers/main/main-routing.module";
import { UtilsModule } from "src/app/components/utils/utils.module";
import { ProductsComponent } from "src/app/containers/main/products/products.component";
import { DashboardComponent } from "src/app/containers/main/dashboard/dashboard.component";
import { ShoppingComponent } from './shopping/shopping.component';
import { ExtractionsComponent } from "src/app/components/utils/extractions/extractions.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { userSettingsReducer } from "src/app/containers/main/store/user-settings/reducers";
import { UserSettingsEffects } from "src/app/containers/main/store/user-settings/effects";
import { ProductFormComponent } from "src/app/components/main/products/product-form/product-form.component";
import { ShoppingFormComponent } from "src/app/components/main/shopping/shopping-form/shopping-form.component";
import { ShoppingListComponent } from "src/app/components/main/shopping/shopping-list/shopping-list.component";
import { ProductCategoryFormComponent } from "src/app/components/main/products/product-category-form/product-category-form.component";

@NgModule({
  declarations: [ MainComponent, DashboardComponent, ProductsComponent, ShoppingComponent, ShoppingFormComponent, ShoppingListComponent,
    ExtractionsComponent, ProductCategoryFormComponent, ProductFormComponent ],
  imports: [ MainRoutingModule, CommonModule, UtilsModule,
    StoreModule.forFeature('userSettings', userSettingsReducer),
    EffectsModule.forFeature( [UserSettingsEffects] ) ]
})
export class MainModule {}
