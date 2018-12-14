
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "src/app/components/utils/navigation/navigation.component";
import { ProductFormComponent } from "src/app/components/common/product-form/product-form.component";
import { FormComponent } from "src/app/components/utils/form/form.component";
import { ModalComponent } from "src/app/components/utils/modal/modal.component";
import { SpinnerComponent } from "src/app/components/utils/spinner/spinner.component";
import { ProductsCartComponent } from "src/app/components/common/products-cart/products-cart.component";
import { RatesComponent } from "src/app/components/utils/rates/rates.component";
import { SliderComponent } from "src/app/components/utils/slider/slider.component";
import { ConfirmComponent } from './confirm/confirm.component';
import { ImageDirective } from "src/app/components/utils/image-directive";

@NgModule({
  declarations: [ NavigationComponent, ProductFormComponent, FormComponent, ModalComponent, SpinnerComponent,
    ProductsCartComponent, RatesComponent, SliderComponent, ConfirmComponent, ImageDirective
  ],
  imports: [ CommonModule ],
  exports: [ NavigationComponent, ProductFormComponent, FormComponent, ModalComponent, SpinnerComponent,
    ProductsCartComponent, RatesComponent, SliderComponent, ConfirmComponent, ImageDirective ]
})
export class UtilsModule{

}
